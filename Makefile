BUILDDIR = _site
JSOUT = $(BUILDDIR)/js
CSS = $(BUILDDIR)/css
SITE = kubrick
REMOTEPATH = /srv/http/hamant.net
OPSPATH = $(HOME)/src/personal/hamant-ops

all: build

site:
	jekyll build

coffee:
	coffee -c -o $(JSOUT)/ js/*.coffee

styles:
	mkdir -p $(CSS)
	cat css/inuit.styl css/site.styl | stylus -c > $(CSS)/site.css

min:
	uglifyjs $(JSOUT)/bootstrap.js > $(JSOUT)/bootstrap.min.js
	uglifyjs $(JSOUT)/site.js > $(JSOUT)/site.min.js

gzip:
	gzip -c $(JSOUT)/bootstrap.min.js > $(JSOUT)/bootstrap.min.js.gz
	gzip -c $(JSOUT)/site.min.js > $(JSOUT)/site.min.js.gz
	gzip -c $(CSS)/site.css > $(CSS)/site.css.gz

post:
	cp _posts/post_template.md _posts/$(shell date "+%Y-%m-%d")-TITLE.md

push:
	cd _site; rsync -r -t -v ./ $(SITE):$(REMOTEPATH)

deploy: build push
	cd $(OPSPATH); ansible personal -m service -a "name=nginx state=restarted"

build: site coffee styles min gzip

clean:
	rm -rf $(BUILDDIR)

.PHONY: build all
