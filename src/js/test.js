const state = { countA: 0, countB: 0, countC: 0 }
const publisher = ui.publisher()

function customButton(){
    let count = 0
    const content = () => `Count is ${count}`
    return ui.clickable(
        btn=>{
            count++
            btn.replaceChildren(content())
        },
        button({style: "color: green;"}, content())
    )
}

document.getElementsByTagName('body')[0].append(
    div({ style: "color: red;" }, "hi there",
        h1({ style: "color: blue;" }, "lorem ipsum"),
        h2({ style: "color: green;" }, "lorem ipsum"),
        h3({ style: "color: lime;" }, "lorem ipsum"),
        h4("lorem ipsum"),
        h5("lorem ipsum"),
        p("hi there"),
    ),
    tag("article", { className: "card" },
        tag("h2", "Lorem Ipsum"),
        tag("p", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
        tag("p", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
        tag("p", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
        tag("p", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
        tag("p", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
    ),
    tag("code", "const eli = 'AWESOME'"),
    article({ className: "example" },
        h2("Counter Example"),
        p("You can easily confidure a UI to be reactive. Here is an example of a counter."),
        ui.clickable(btn => {
            state.countA += 1
            btn.replaceChildren(`Count: ${state.countA}`)
        }, button({ className: "btn" }, "Count: 0")),
        br(),
        p("or you can do it this way"),
        button({
            className: "btn",
            onclick: function () { this.replaceChildren(`Count: ${++state.countB}`); }
        }, "Count: 0")
    ),
    article({ className: "example" },
        h2("Publisher Example"),
        p("You can also use a publisher to make elements subscribe to different events"),
        p("Below, you can see three buttons the first one will increase the state of the count, while the other ones will show the new count evertime first button is clicked."),
        button(
            {
                onclick: () => { publisher.publish({ name: "", count: ++state.countC }) }
            }, "Click Me!"),
        publisher.makeSubscriber(
            button("Count: 0"),
            btn =>  btn.replaceChildren(`Count: ${state.countC}`)
        ),
        publisher.makeSubscriber(
            button("Count: 0"),
            btn => btn.replaceChildren(`Count: ${state.countC}`)
        ),
    ),
    article({className: "example"},
        h2("Custom Components"),
        p("It is really easy to define your own custom components (with thier own state)! You just have to follow a few rules:"),
        ul(
            li("The custom component should be a string for an HTMLElement."),
            li("The first argument in the component should be the props"),
        ),
        p("Here is a custom component:"),
        customButton(),
    ),
    img("../../sand.png", "I hate sand"),
)
