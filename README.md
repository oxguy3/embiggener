# Embiggener
Embiggener is a browser extension for finding the biggest possible version of an image. When you are looking at a reduced-size image that exists in better quality, Embiggener's icon will light up. Simply click the icon to be taken to the higher-quality image.

## Installation
For now, this extension only supports Chromium-based browsers (e.g. Google Chrome, Vivaldi, etc). I'll probably add support for other browsers soon.

I haven't put it on the Chrome Web Store yet, so for now, you'll have to install it in developer mode. Download this repository to your computer (either by clicking the "Download ZIP" button and unzipping, or by using `git clone`). Go to <chrome://extensions/> in your web browser and turn on developer mode with the toggle switch. Click "Load unpacked" and select the directory where you downloaded this repository.

## FAQ

**How does Embiggener work?**

Embiggener has a knowledge base of the rules that dictate the URLs of images on many popular websites, and uses this information to generate the URL of the highest-quality version of an image. Unlike Google Images reverse search, Embiggener does not rely on web crawling, so it can often find URLs that had never appeared on any public site before.

**What sites does Embiggener support?**

New sites are being added regularly, so please check the `modules/parsers` directory for a list of all the sites that are supported. Note that some parsers actually represent a collection of sites:

* Amazon.js supports Amazon.com and IMDb (and possibly other Amazon properties).
* Gannett.js supports all newspapers in the USA Today Network.
* SportsEngine.js supports all teams and leagues using the SportsEngine system (for example, the United Soccer League).
* VoxMedia.js supports all Vox Media properties (The Verge, Vox, SBNation, Eater, Polygon, etc).
* Wikimedia.js supports all Wikimedia Foundation projects, including Wikipedia, Wikimedia Commons, Wikisource, Wikidata, etc.

**Why don't you support [my favorite site]?**

There are two possibilities: A) I simply haven't gotten to that site yet, or B) there is some technical obstacle with that site. This project is very young, so it's probably A; feel free to [create a new issue](https://github.com/oxguy3/embiggener/issues) and request it (**please** search to see if an issue for that site already exists).

However, it might be that your site is difficult or impossible to support. Some sites use completely random URLs that lack any usable information; some sites use signed URLs which prevent manipulation; and some sites simply don't store their images in high quality. There are a few sites that I know to be resistant to embiggening, including:

* **Reddit**. Reddit's "thumbs" server only stores one size of images, and their "external preview" server uses signed URLs that cannot be edited. Nothing in any of the URLs has any relation to the original Reddit post, so there's not much we can do.
* **Instagram**. Instagram's URLs look like they might be signed; I wasn't getting anywhere with them (though I didn't try for very long).
* **Wall Street Journal**. WSJ's URL format is very odd, and it seems like different resolutions can have different names (which is not automatable). Further research needed.

## License
All code is this repository is available under the MIT License.

> MIT License
>
> Copyright (c) 2018 Hayden Schiff (oxguy3)
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

The extension's icon is the ['action-insert-image' icon](http://www.iconarchive.com/show/oxygen-icons-by-oxygen-icons.org/Actions-insert-image-icon.html) from Oxygen Icons, and is free to use under the [GNU Lesser General Public License](https://www.gnu.org/licenses/lgpl-3.0.en.html).
