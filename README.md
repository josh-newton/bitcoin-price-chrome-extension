Bitcoin Price
=============
A simple chrome extension, written using angularjs that grabs the price of bitcoin in GBP, EUR and USD from a number of websites.

icon.svg taken and adapted from the bitcoin wiki [here](https://en.bitcoin.it/wiki/Promotional_graphics).

Usage
=====
Requires nodejs to be installed.

Run the following in Terminal:
```bash
git clone https://github.com/josh-newton/bitcoin-price-chrome-extension bitcoin-price
cd bitcoin-price
npm install		# install npm dependencies
bower install	# install bower dependencies
gulp build		# build project using gulp
```

* Now open chrome and type 'chrome://extensions' in the address bar. 
* Check the 'developer mode' checkbox
* Click 'load unpacked extension...' and open the bitcoin-price/dist folder
* Now the extension should appear to the right of the address bar.