const state = { countA: 0, countB: 0, countC: 0 }

const publisher = ui.publisher()

function customForm(handleSubmit = () => { }) {
    let email = ""
    let password = ""
    let age = ""
    return ui.form(
        {
            onsubmit: e => {
                e.preventDefault()
                handleSubmit({ email, password, age })
            },
        },
        ui.label("Email",
            ui.input({
                type: "text", onchange: e => {
                    email = e.target.value
                }
            }),
        ),
        ui.label("Password",
            ui.input({
                type: "password", onchange: e => {
                    password = e.target.value
                }
            }),
        ),
        ui.label("Age",
            ui.input({
                type: "number", onchange: e => {
                    age = e.target.value
                }
            }),
        ),
        ui.input({ type: "submit" }),
    )
}

function customButton() {
    let count = 0
    const content = () => `Count is ${count}`
    return ui.clickable(
        btn => {
            count++
            btn.replaceChildren(content())
        },
        ui.button({ style: "color: green;" }, content())
    )
}

function customTextEditor() {
    let elementType = "p"
    let content = ""
    let src = ""

    const publisher = ui.publisher()
    const contentTypePublisher = ui.publisher()

    const contentInput = () => ui.input({ type: "text", onchange: e => content = e.target.value, value: content })

    function displayContentEditor() {
        if (elementType === "a") {
            return ui.span(contentInput(), ui.input({ type: "text", onchange: e => src = e.target.value }))
        } else {
            return ui.span(contentInput())
        }
    }

    return ui.div(
        ui.h2("Text Editor"),
        ui.form({
            className: "ui-editor",
            onsubmit: e => {
                e.preventDefault()
                const props = {}
                if (elementType === "a") {
                    props.href = src
                }
                publisher.publish(tag(elementType, props, content))
                content = ""
                contentTypePublisher.publish(elementType)
            }
        },
        ui.label(
                "Select Element",
                ui.select(
                    {
                        onchange: e => {
                            elementType = e.target.value
                            contentTypePublisher.publish(elementType)
                        }
                    },
                    ui.tag("option", "p"),
                    ui.tag("option", "h1"),
                    ui.tag("option", "h2"),
                    ui.tag("option", "span"),
                    ui.tag("option", "a"),
                )
            ),
            ui.label("Content",
                contentTypePublisher.makeSubscriber(
                    displayContentEditor(),
                    (_el, _, replaceWith) => {
                        replaceWith(displayContentEditor())
                    }
                )
            ),
            ui.button("Add +"),
        ),

        ui.h2("Content"),
        publisher.makeSubscriber(ui.div(), (el, data) => {
            el.append(data)
        })
    )
}

document.getElementsByTagName('body')[0].append(
    ui.div({ style: "color: red;" }, "hi there",
        ui.h1({ style: "color: blue;" }, "lorem ipsum"),
        ui.h2({ style: "color: green;" }, "lorem ipsum"),
        ui.h3({ style: "color: lime;" }, "lorem ipsum"),
        ui.h4("lorem ipsum"),
        ui.h5("lorem ipsum"),
        ui.p("hi there"),
    ),
    ui.tag("article", { className: "card" },
        ui.tag("h2", "Lorem Ipsum"),
        ui.tag("p", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
        ui.tag("p", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
        ui.tag("p", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
        ui.tag("p", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
        ui.tag("p", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
    ),
    ui.tag("code", "const eli = 'AWESOME'"),
    ui.article({ className: "example" },
        ui.h2("Counter Example"),
        ui.p("You can easily confidure a UI to be reactive. Here is an example of a counter."),
        ui.clickable(btn => {
            state.countA += 1
            btn.replaceChildren(`Count: ${state.countA}`)
        }, ui.button({ className: "btn" }, "Count: 0")),
        ui.br(),
        ui.p("or you can do it this way"),
        ui.button({
            className: "btn",
            onclick: function () { this.replaceChildren(`Count: ${++state.countB}`); }
        }, "Count: 0")
    ),
    ui.article({ className: "example" },
        ui.h2("Publisher Example"),
        ui.p("You can also use a publisher to make elements subscribe to different events"),
        ui.p("Below, you can see three buttons the first one will increase the state of the count, while the other ones will show the new count evertime first button is clicked."),
        ui.button(
            {
                onclick: () => { publisher.publish({ name: "", count: ++state.countC }) }
            }, "Click Me!"),
        publisher.makeSubscriber(
            ui.button("Count: 0"),
            btn => btn.replaceChildren(`Count: ${state.countC}`)
        ),
        publisher.makeSubscriber(
            ui.button("Count: 0"),
            btn => btn.replaceChildren(`Count: ${state.countC}`)
        ),
    ),
    ui.article({ className: "example" },
        ui.h2("Custom Components"),
        ui.p("It is really easy to define your own custom components (with thier own state)! You just have to follow a few rules:"),
        ui.ul(
            ui.li("The custom component should be a string for an HTMLElement."),
            ui.li("The first argument in the component should be the props"),
        ),
        ui.p("Here is a custom component:"),
        customButton(),
        ui.p("And here is a form"),
        customForm((data) => console.table(data)),
        ui.p("To get really fancy, I made a custom text editor"),
        customTextEditor(),
    ),
    ui.img({ src: "../../sand.png" }, "I hate sand"),
)
