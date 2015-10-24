/*  CSSPath JavaScript library
 *  (c) 2015 Zahin Omar Alwa
 *
 *  CSSpath is freely distributable under the terms of a MIT license.
 *  For details, see the CSSPath github repository: https://github.com/Zahinize/css-path
 *
 *---------------------------------------------------------------------------------------*/

/**
 * Invoke root IIFE with global context
 */
(function() {
  /**
   * Declare/Define variables
   */
  var CSSPath, root,
    indexOf = [].indexOf || function(item) {
      for (var i = 0, len = this.length; i < len; i++) {
        if ((i in this) && (this[i] === item)) {
          return i;
        }
      }
      return -1;
    };

  /**
   * Invoke namespace IIFE that returns constructor reference
   *
   * @param undefined
   * @return undefined
   */
  CSSPath = (function() {

    /**
     * Constructor function with configuration options
     *
     * @param undefined
     * @return undefined
     */
    function CSSPath(options) {
      /** TODO: Make library configurable
      */
    }

    /**
     * Detects a true HTML element
     *
     * @param element
     * @return Boolean
     */
    CSSPath.prototype.isElement = function(element) {
      return !!((element != null ? element.nodeType : void 0) === 1);
    };

    /**
     * Gets all valid parents of given element
     *
     * @param element
     * @return Array
     */
    CSSPath.prototype.getAllParents = function(element) {
      var currentElement, result;
      result = [];
      if (this.isElement(element)) {
        currentElement = element;
        while (this.isElement(currentElement)) {
          result.push(currentElement);
          currentElement = currentElement.parentNode;
        }
      }
      return result;
    };

    /**
     * Gets tag selector of given element
     *
     * @param element
     * @return String
     */
    CSSPath.prototype.getTagSelector = function(element) {
      return element.tagName.toLowerCase();
    };

    /**
     * Sanitize a string
     *
     * @param String
     * @return String
     */
    CSSPath.prototype.sanitizeItem = function(item) {
      return escape(item).replace(/\%/g, '\\').replace(/\*\+\-\.\//g, '\\$&');
    };

    /**
     * Detects a unique valid Id
     *
     * @param String
     * @return Boolean
     */
    CSSPath.prototype.validateId = function(id) {
      if (id == null) {
        return false;
      }
      if (/^\d/.exec(id)) {
        return false;
      }
      return document.querySelectorAll("#" + id).length === 1;
    };

    /**
     * Gets a valid Id selector
     *
     * @param element
     * @return String
     */
    CSSPath.prototype.getIdSelector = function(element) {
      var id;
      id = element.getAttribute('id');
      if (id != null) {
        id = this.sanitizeItem(id);
      }
      id = this.validateId(id) ? id = "#" + id : id = null;
      return id;
    };

    /**
     * Gets a valid Class selector
     *
     * @param element
     * @return Array
     */
    CSSPath.prototype.getClassSelectors = function(element) {
      var classString, item, result;
      result = [];
      classString = element.getAttribute('class');
      if (classString != null) {
        classString = classString.replace(/\s+/g, ' ');
        classString = classString.replace(/^\s|\s$/g, '');
        if (classString !== '') {
          result = (function() {
            var i, len, ref, results;
            ref = classString.split(/\s+/);
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              item = ref[i];
              results.push("." + (this.sanitizeItem(item)));
            }
            return results;
          }).call(this);
        }
      }
      return result;
    };

    /**
     * Gets a valid Attribute selector
     *
     * @param element
     * @return Array
     */
    CSSPath.prototype.getAttributeSelectors = function(element) {
      var attribute, blacklist, i, len, ref, ref1, result;
      result = [];
      blacklist = ['id', 'class'];
      ref = element.attributes;
      for (i = 0, len = ref.length; i < len; i++) {
        attribute = ref[i];
        if (ref1 = attribute.nodeName, indexOf.call(blacklist, ref1) < 0) {
          result.push("[" + attribute.nodeName + "=" + attribute.nodeValue + "]");
        }
      }
      return result;
    };

    /**
     * Gets a valid Nth Child selector
     *
     * @param element
     * @return String
     */
    CSSPath.prototype.getNthChildSelector = function(element) {
      var counter, i, len, parentElement, sibling, siblings;
      parentElement = element.parentNode;
      if (parentElement != null) {
        counter = 0;
        siblings = parentElement.childNodes;
        for (i = 0, len = siblings.length; i < len; i++) {
          sibling = siblings[i];
          if (this.isElement(sibling)) {
            counter++;
            if (sibling === element) {
              return ":nth-child(" + counter + ")";
            }
          }
        }
      }
      return null;
    };

    /**
     * Detects the element unique selector
     *
     * @param element, String
     * @return Boolean
     */
    CSSPath.prototype.testSelector = function(element, selector) {
      var isUnique = false, result;

      if ((selector != null) && selector !== '') {
        result = element.ownerDocument.querySelectorAll(selector);

        if ((result.length === 1) && (result[0] === element)) {
          isUnique = true;
        }
      }

      return isUnique;
    };

    /**
     * Gets all selector for given element
     *
     * @param element
     * @return Object
     */
    CSSPath.prototype.getAllSelectors = function(element) {
      return {
        tag: this.getTagSelector(element),
        id: this.getIdSelector(element),
        cls: this.getClassSelectors(element),
        attr: this.getAttributeSelectors(element),
        nth: this.getNthChildSelector(element)
      };
    };

    /**
     * Detects a unique element in its parent node
     *
     * @param element, String
     * @return Boolean
     */
    CSSPath.prototype.testUniqueElement = function(element, selector) {
      var elementList, parent;
      parent = element.parentNode;
      elementList = parent.querySelectorAll(selector);
      return (elementList.length === 1) && (elementList[0] === element);
    };

    /**
     * Gets an unique selector for given element
     *
     * @param element
     * @return String
     */
    CSSPath.prototype.getUniqueSelector = function(element) {
      var allClasses, selector, selectors;

      selectors = this.getAllSelectors(element);
      
      if (selectors.id != null) {
        return selectors.id;
      }
      
      if (this.testUniqueElement(element, selectors.tag)) {
        return selectors.tag;
      }
      
      if (selectors.cls.length !== 0) {
        allClasses = selectors.cls.join('');
        selector = allClasses;
        if (this.testUniqueElement(element, selector)) {
          return selector;
        }
        selector = selectors.tag + allClasses;
        if (this.testUniqueElement(element, selector)) {
          return selector;
        }
      }
      
      return selectors.nth;
    };

    /**
     * Gets an unique and shortest possible selector for given element
     *
     * @param element
     * @return String
     */
    CSSPath.prototype.getSelector = function(element) {
      var allSelectors, i, item, j, len, len1, parents, result, selector, selectors;
      allSelectors = [];
      parents = this.getAllParents(element);

      /**
       * Gets all unique selector for element parent nodes
       */
      for (i = 0, len = parents.length; i < len; i++) {
        item = parents[i];
        selector = this.getUniqueSelector(item);
        if (selector != null) {
          allSelectors.push(selector);
        }
      }

      /**
       * Return the shortest unique selector matched for given element
       */
      selectors = [];
      for (j = 0, len1 = allSelectors.length; j < len1; j++) {
        item = allSelectors[j];
        selectors.unshift(item);
        result = selectors.join(' > ');
        if (this.testSelector(element, result)) {
          return result;
        }
      }
      return null;
    };

    return CSSPath;
  })();

  if (typeof define !== "undefined" && define !== null ? define.amd : void 0) {
    define([], function() {
      return CSSPath;
    });
  } else {
    root = ((typeof exports !== "undefined") && (exports !== null)) ? exports : this;
    root.CSSPath = CSSPath;
  }

}).call(this);