/**
 * @template {HTMLElement} T
 * @param {T} element 
 * @param {Object<string, any>} props 
 * @param  {...string|HTMLElement} children 
 * @returns {T}
 */
function base(element, props, ...children) {
    if (props instanceof HTMLElement || typeof props === "string") {
        element.append(props)
    } else {
        for (const [key, value] of Object.entries(props)) {
            element[key] = value
        }
    }
    element.append(...children)
    return element
}

/**
 * 
 * @param {keyof HTMLElementTagNameMap} elementName 
 * @param {Object<string, any>} props 
 * @param  {...string|HTMLElement} children 
 * @returns 
 */
function tag(elementName, props, ...children) {
    return base(document.createElement(elementName), props, ...children)
}

/**
 * Creates a div
 * @param {Object<string, any>} props 
 * @param  {...string|HTMLElement} children 
 */
function div(props, ...children) {
    return base(document.createElement("div"), props, ...children)
}
/**
 * Creates a select
 * @param {Object<string, any>} props 
 * @param  {...string|HTMLElement} children 
 */
function select(props, ...children) {
    return base(document.createElement("select"), props, ...children)
}
/**
 * Creates a paragraph
 * @param {Object<string, any>} props the class string for the element
 * @param {string|HTMLElement[]} children items that get appended to this element as children
 */
function p(props, ...children) {
    return base(document.createElement("p"), props, ...children)
}
/**
 * Creates a h1
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */
function h1(props, ...children) {
    return base(document.createElement("h1"), props, ...children)
}
/**
 * Creates a h2
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */
function h2(props, ...children) {
    return base(document.createElement("h2"), props, ...children)
}
/**
 * Creates a h3
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */
function h3(props, ...children) {
    return base(document.createElement("h3"), props, ...children)
}
/**
 * Creates a h4
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */
function h4(props, ...children) {
    return base(document.createElement("h4"), props, ...children)
}
/**
 * Creates a h5
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */
function h5(props, ...children) {
    return base(document.createElement("h5"), props, ...children)
}

/**
 * Creates a button
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */
function button(props, ...children) {
    return base(document.createElement("button"), props, ...children)
}

/**
 * Creates a img
 * @param {Object<string, any>} props the class string for the element
 */
function img(props, src, alt = "") {
    return base(document.createElement("img"), props, [])
}

/**
 * Creates a span
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */

function span(props, ...children) {
    return base(document.createElement("span"), props, ...children)
}

/**
 * Creates a form
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */
function form(props, ...children) {
    return base(document.createElement("form"), props, ...children)
}
/**
 * Creates a label
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */
function label(props, ...children) {
    return base(document.createElement("label"), props, ...children)
}

/**
 * Creates a input
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */
function input(props, ...children) {
    return base(document.createElement("input"), props, ...children)
}

/**
 * Creates a br
 */
function br() {
    return document.createElement("br")
}

/**
 * Creates an ordered list
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */
function ol(props, ...children) {
    return base(document.createElement("ol"), props, ...children)
}
/**
 * Creates an unordered list
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */
function ul(props, ...children) {
    return base(document.createElement("ul"), props, ...children)
}
/**
 * Creates a list item
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */

function li(props, ...children) {
    return base(document.createElement("li"), props, ...children)
}
/**
 * Creates a anchor (link)
 * @param {Object<string, any>} props the class string for the element
 * @param {...string|HTMLElement} children items that get appended to this element as children
 */
function a(props, href, ...children) {
    const item = base(document.createElement("a"), props, ...children)
    item.href = href
    return item
}

/**
 * @template {HTMLElement} T
 * @param {Object<string, any>} props 
 * @param  {...string|T} children 
 */
function article(props, ...children) {
    return base(document.createElement("article"), props, ...children)
}


/**
 * This callback is displayed as a global member.
 * @template T
 * @callback subscriberCallback
 * @param {T} element
 * @param {*} eventData
 * @returns {void}
 */



const ui = (() => {
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMchildrenLoaded', fn);
        }
    }

    /**
     * 
     * @param {subscriberCallback<HTMLElement>} fn 
     * @param  {HTMLElement} element 
     */
    function clickable(fn, element) {
        element.onclick = () => fn(element)
        return element
    }

    function publisher() {
        const eventName = uuidv4()
        return {
            publish(data) {
                document.dispatchEvent(new CustomEvent(eventName, {
                    detail: data,
                }))
            },
    
            /**
             * @template {HTMLElement} T
             * @param {T} element 
             * @param {subscriberCallback<T>} fnElementEventData 
             */
            makeSubscriber(element, fnElementEventData) {
                document.addEventListener(eventName, (e) => {
                    fnElementEventData(element, e.detail)
                })
                return element
            }
        }
    }

    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    
    return {
        ready,
        clickable,
        publisher,
    }
})()