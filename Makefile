BUILDDIR = _site
JSOUT = $(BUILDDIR)/js
CSS = $(BUILDDIR)/css
SITE = kubrick
REMOTEPATH = /srv/hamant.net

all: build

site:
	jekyll --kramdown

coffee:
	coffee -c -o $(JSOUT)/ js/*.coffee

styles:
	mkdir -p $(CSS)
	cat css/inuit.styl css/site.styl | stylus -c > $(CSS)/site.css

min:
	uglifyjs -nc $(JSOUT)/bootstrap.js > $(JSOUT)/bootstrap.min.js
	uglifyjs -nc $(JSOUT)/site.js > $(JSOUT)/site.min.js

gzip:
	gzip -c $(JSOUT)/bootstrap.min.js > $(JSOUT)/bootstrap.min.js.gz
	gzip -c $(JSOUT)/site.min.js > $(JSOUT)/site.min.js.gz
	gzip -c $(CSS)/site.css > $(CSS)/site.css.gz

post:
	cp _posts/post_template.md _posts/$(shell date "+%Y-%m-%d")-TITLE.md

push:
	cd _site; rsync -r -t -v ./ $(SITE):$(REMOTEPATH)

deploy: build push

build: site coffee styles min gzip

clean:
	rm -rf $(BUILDDIR)

.PHONY: build all
