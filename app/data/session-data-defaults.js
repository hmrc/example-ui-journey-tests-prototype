module.exports = {

    // warning, if you make a change to this, users have to reset their session data

    "journeys": [
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
            { url: "/check-your-answers",
                heading: "Check your answers",
                answers: [
                    { field: "perfect-day", label: "Your perfect day" },
                    { field: "claim-to-fame", label: "Your claim to fame" },
                    { field: "relaxing-part-of-day", label: "Your relaxing part of day" }
                ] },
            { url: "/confirmation-page" }
        ] },
    ]

}
