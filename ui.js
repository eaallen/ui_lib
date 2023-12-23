const ui = (() => {

    /**
     * @template {HTMLElement} T
     * @param {T} element 
     * @param {Object<string, any>} props 
     * @param  {...string|HTMLElement} children 
     * @returns {T}
     */
    function base(element, props, ...children) {
        if (props !== undefined) {
            if (props instanceof HTMLElement || props instanceof SVGElement || typeof props === "string") {
                element.append(props)
            } else {
                if (element instanceof SVGElement) {
                    for (const [key, value] of Object.entries(props)) {
                        element.setAttributeNS("http://www.w3.org/2000/svg", key, value)
                    }
                } else {
                    for (const [key, value] of Object.entries(props)) {
                        element[key] = value
                    }
                }
            }
            element.append(...children)
        }
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
     * 
     * @param {keyof SVGElementTagNameMap} elementName 
     * @param {Object<string, any>} props 
     * @param  {...string|HTMLElement} children 
     * @returns 
     */
    function svgTag(elementName, props, ...children) {
        return base(document.createElementNS("http://www.w3.org/2000/svg", elementName), props, ...children)
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
    function a(props, ...children) {
        const item = base(document.createElement("a"), props, ...children)
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
     * @template {HTMLElement} T
     * @param {Object<string, any>} props 
     * @param  {...string|T} children 
    */
    function table(props, ...children) {
        return base(document.createElement("table"), props, ...children)
    }
    /**
     * @template {HTMLElement} T
     * @param {Object<string, any>} props 
     * @param  {...string|T} children 
    */
    function tbody(props, ...children) {
        return base(document.createElement("tbody"), props, ...children)
    }
    /**
     * @template {HTMLElement} T
     * @param {Object<string, any>} props 
     * @param  {...string|T} children 
    */
    function td(props, ...children) {
        return base(document.createElement("td"), props, ...children)
    }
    /**
     * @template {HTMLElement} T
     * @param {Object<string, any>} props 
     * @param  {...string|T} children 
    */
    function tr(props, ...children) {
        return base(document.createElement("tr"), props, ...children)
    }
    /**
     * @template {HTMLElement} T
     * @param {Object<string, any>} props 
     * @param  {...string|T} children 
    */
    function th(props, ...children) {
        return base(document.createElement("th"), props, ...children)
    }
    /**
     * @template {HTMLElement} T
     * @param {Object<string, any>} props 
     * @param  {...string|T} children 
    */
    function thead(props, ...children) {
        return base(document.createElement("thead"), props, ...children)
    }



    /**
     * This callback is called anytime the publisher `publish` method is called.
     * @template T
     * @callback subscriberCallback
     * @param {T} element
     * @param {*} eventData
     * @param {replaceElementInMemoryAndInDomWith<HTMLElement>} eventData
     * @returns {void}
    */

    /**
     * This callback is called when we want to replace the subscribers original 
     * element with a new element
     * @template T
     * @callback replaceElementInMemoryAndInDomWith
     * @param {T} element
     * @returns {void}
    */



    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
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
                    fnElementEventData(element, e.detail, (newElement) => {
                        element.replaceWith(newElement)
                        element = newElement
                    })
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

    /**
     * gets the first item the matches the query and then gives its children as declared 
     * in the buildFn
     * @param {string} query 
     * @param {(el: Element)=>void} buildFn 
     */
    function root(query, buildFn) {
        const node = document.querySelector(query)
        buildFn(node)
    }

    return {
        ready,
        clickable,
        publisher,
        p,
        div,
        h1,
        h2,
        h3,
        h4,
        h5,
        tag,
        base,
        select,
        button,
        img,
        span,
        a,
        form,
        label,
        input,
        br,
        ol,
        ul,
        li,
        article,
        table,
        tbody,
        td,
        th,
        thead,
        tr,
        root,
        uuidv4,
        svgTag,
    }
})()
