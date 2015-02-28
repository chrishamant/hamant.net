BUILDDIR = _site
SITE = kubrick
REMOTEPATH = /srv/http/hamant.net

all: build

site:
	hugo

push:
	cd $(BUILDDIR); rsync -r -t -v ./ $(SITE):$(REMOTEPATH)

build: site

clean:
	rm -rf $(BUILDDIR)

.PHONY: build all
