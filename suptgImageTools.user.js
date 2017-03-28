// ==UserScript==
// @name         SupTG Image Tools
// @version      1.0
// @namespace    https://github.com/faokryn/suptg-image-tools
// @description  Expands all images in a SupTG thread and makes clicking an image toggle size
// @author       Colin O'Neill <colin@faokryn.com>
// @license      Apache v2.0
// @match        http://suptg.thisisnotatrueending.com/archive/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function toggleImgSize(img) {
        if (img.getAttribute("data-thumb")) {
            // image is full size, and must be contracted to thumbnail
            img.setAttribute("src", img.getAttribute("data-thumb"));
            img.setAttribute("data-thumb", "");
        }
        else {
            // image is a thumbnail, and must be expanded to full size
            img.setAttribute("data-thumb", img.getAttribute("src"));
            img.setAttribute("src", img.parentElement.getAttribute("href"));
        }
    }

    var i, img, imgArr, images;

    images = document.getElementsByName("delform")[0].getElementsByTagName("img");

    // move the img elements from their HTMLCollection to an Array
    // this is done to give access to the forEach method. Using a while loop and getting the img element via image[i]
    // does not work, as it causes the event on every link to resize the last image
    // this may be because no new scope is created by a while loop, so the same memory is used for the img variable
    // and simply overwritten, so the function in the event is called on it's most recent contents.
    imgArr = [];
    i = 0;
    while (i < images.length) {
        imgArr.push(images[i++]);
    }

    imgArr.forEach(function (img, i) {
        // remove width and height constraints on image
        img.setAttribute("width", "");
        img.setAttribute("height", "");

        // default to full size image instead of thumbnail
        toggleImgSize(img);

        // add event to image click to toggle image size
        img.parentElement.addEventListener("click", function (evt) {
            evt.preventDefault();
            toggleImgSize(img);
        });
    });

})();
