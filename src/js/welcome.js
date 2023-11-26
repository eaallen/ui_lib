console.log("hi there");
ui.ready(() => {
    ui.root("#line-count", async (element) => {
        const request = await fetch("src/js/ui.js")
        const text = await request.text()
        element.replaceChildren(text.split("\n").length)
    })

    ui.root("#example-1", element => {
        element.replaceChildren(exampleEditor(simpleExample))
    })
    ui.root("#example-2", element => {
        element.replaceChildren(exampleRandomNumber(randomNumber))
    })
    ui.root("#example-3", element => {
        element.replaceChildren(exampleEditor(displayItems))
    })
    ui.root("#example-4", element => {
        element.replaceChildren(exampleEditor(displayAndCheckOffListItems))
    })
    ui.root("#example-5", element => {
        element.replaceChildren(exampleEditor(exampleForm))
    })
    ui.root("#example-6", element => {
        element.replaceChildren(exampleEditor(customComponentsExample))
    })
    ui.root("#example-7", element => {
        element.replaceChildren(exampleEditor(anonymousCustomComponentsExample))
    })
})

function exampleEditor(exampleFn) {
    const publisher = ui.publisher()
    return ui.article({ className: "example" },
        aceReadOnlyEditor(exampleFn),
        ui.div({ className: "result" },
            ui.button({
                onclick: () => {
                    publisher.publish("run")
                }
            }, "run"),
            publisher.makeSubscriber(ui.div(), (el) => {
                exampleFn(el)
            })
        ),
    )
}

function exampleRandomNumber(exampleFn) {
    const publisher = ui.publisher()
    return ui.article({ className: "example" },
        aceReadOnlyEditor(exampleFn),
        ui.div({ className: "result" },
            ui.button({
                onclick: () => {
                    publisher.publish("run")
                }
            }, "run"),
            publisher.makeSubscriber(ui.p("Your lucky number is: ", ui.span({ id: "random-num" })), (el) => {
                exampleFn(el)
            })
        ),
    )
}

function aceReadOnlyEditor(exampleFn) {
    const el = ui.div({ className: "editor" })
    var editor = ace.edit(el);
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
    editor.setValue(exampleFn.toString(), -1)
    editor.setReadOnly(true)
    return el
}


function simpleExample(element) {
    const state = { countA: 0, countB: 0 }
    element.append(
        ui.div({ style: "color: red;" }, "hi there",
            ui.h1({ style: "color: blue;" }, "lorem ipsum"),
            ui.h2({ style: "color: green;" }, "lorem ipsum"),
            ui.h3({ style: "color: lime;" }, "lorem ipsum"),
            ui.h4("lorem ipsum"),
            ui.h5("lorem ipsum"),
            ui.p("Hi there,"),
            ui.p("This is an example"),
        ),
        ui.div(
            ui.tag("code", "Using the Tag Method"),
            ui.article(
                ui.h2("Counter Example"),
                ui.p("You can easily configure a UI to be reactive. Here is an example of a counter."),
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
        )
    )
}

function randomNumber() {
    ui.root("#random-num", element => {
        element.replaceChildren(Math.floor(Math.random() * 10000))
    })
}

function displayItems(element) {
    const items = [
        "Oranges",
        "Lemons",
        "Apples",
        "Dragon Fruit",
    ]

    element.append(
        ui.ol(
            ...items.map(x => ui.li(x)),
        ),
    )
}

function displayAndCheckOffListItems(element) {
    const items = [
        "Oranges",
        "Lemons",
        "Apples",
        "Dragon Fruit",
    ]

    element.append(
        ui.ol(
            ...items.map(x => {
                let checked = false
                return ui.clickable(li => {
                    if (checked) {
                        checked = false
                        li.replaceChildren(x)
                    } else {
                        checked = true
                        li.replaceChildren(ui.tag("strike", x))
                    }
                }, ui.li(x))
            }),
        ),

    )

}

function exampleForm(element) {
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

    element.replaceChildren(customForm(data => {
        element.append(
            ui.p("Email: ", data.email),
            ui.p("Password: ", data.password),
            ui.p("age: ", data.age),
        )
    }))
}

function customComponentsExample(element) {
    function customButton(props) {
        let count = 0
        const content = () => `Count is ${count}`
        return ui.button({
            onclick: e => {
                count++
                e.target.replaceChildren(content())
            }
        }, content())
    }

    element.append(
        customButton(),
        customButton(),
    )
}

function customComponentsExample(element) {
    function customButton(props) {
        let count = 0
        const content = () => `Count is ${count}`
        return ui.button({
            onclick: e => {
                count++
                e.target.replaceChildren(content())
            }
        }, content())
    }

    element.append(
        customButton(),
        customButton(),
    )
}

function anonymousCustomComponentsExample(element) {
    const buttonLabels = ["click me", "then me!"]
    element.append(
        ...buttonLabels.map(label =>
            (() => { // anonymous component
                let count = 0
                const content = () => `${label}: ${count}` // also a custom component
                return ui.button({
                    onclick: e => {
                        count++
                        e.target.replaceChildren((content()))
                    }
                }, content())
            })()) // end of anonymous component
    )
}