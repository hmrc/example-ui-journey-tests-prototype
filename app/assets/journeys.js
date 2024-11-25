module.exports = [ // this file is in /assets so changes won't trigger destructive reload

    { name: "Get to know you", steps: [
        { url: "/character-count",
            question: "What would be your perfect day?",
            field: "perfect-day" },
        { url: "/character-count",
            question: "What is your claim to fame?",
            field: "claim-to-fame" },
        { url: "/character-count",
            question: "What’s the most relaxing part of your day?",
            field: "relaxing-part-of-day" },
        { url: "/date",
            question: "When were you born?",
            field: "date-of-birth" },
        { url: "/checkboxes",
            question: "What are your favourite ice-cream flavours?",
            field: "ice-cream",
            items: [
                { value: "vanilla", text: "Vanilla" },
                { value: "chocolate", text: "Chocolate" },
                { value: "strawberry", text: "Strawberry" },
                { divider: "or" },
                { value: "bubblegum", text: "Bubblegum", hint: { text: "Really???" } },
            ]},
        { url: "/radios",
            // pre-create pages with questions you want and just include the url and field name
            field: "where-do-you-live" },
        { url: "/check-your-answers",
            heading: "Check your answers",
            answers: [
                { field: "perfect-day", label: "Your perfect day" },
                { field: "claim-to-fame", label: "Your claim to fame" },
                { field: "relaxing-part-of-day", label: "Most relaxing part of your day" },
                { field: "date-of-birth", label: "Date of birth" },
                { field: "ice-cream", label: "Favourite ice-cream flavours" },
                { field: "where-do-you-live", label: "Your digs" },
                { value: "we think you're chill", label: "Based on your answers" }
            ] },
        { url: "/confirmation-page" }
    ] }

];