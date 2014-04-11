BUILDDIR = $(HAMANTDOTNET_BUILDDIR)
SITE = $(HAMANTDOTNET_SITE)
REMOTEPATH = $(HAMANTDOTNET_REMOTEPATH)
OPSPATH = $(HOME)$(HAMANTDOTNET_OPSPATH)

all: build

install_deps:
	npm install

relink:
	rm site/css/_includes/normalize.styl
	ln -s $(CURDIR)/node_modules/normalize.css/normalize.css site/css/_includes/normalize.styl

install: install_deps relink

push:
	cd $(BUILDDIR); rsync -r -t -v ./ $(SITE):$(REMOTEPATH)

deploy: build push
	cd $(OPSPATH); ansible personal -m service -a "name=nginx state=restarted"

build:
	node bin/build.js

clean:
	rm -rf $(BUILDDIR)

.PHONY: all

