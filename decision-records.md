
# decision records
         

### storage area

even though chrome guidelines recommend using the 'sync' storage area over 'local' (for our use case), the 'local' area is used.

this is because of a limitation; 'sync' will not work in firefox when addons are loaded as temporary from the filesystem (AKA 'unpacked extension').


### background script

the extension manifest's `background` clause includes both `scripts` (from the manifest v2 spec) and `service_worker` (of v3), to support both firefox and chrome.

this is because firefox doesn't recognize `service_worker` at this time, even tho it officially supports v3.  OTOH, the presense of `scripts` will cause a mere warning in chrome.
