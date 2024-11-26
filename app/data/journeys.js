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
    ] },

    {
        name: "Create an account", steps: [
            {
                url: "/text-input",
                question: "What is your name?",
                field: "name"
            },
            {
                url: "/email",
                question: "What is your email?",
                field: "email"
            },
            {
                url: "/autocomplete",
                question: "Where do you live?",
                field: "where-you-live"
            },
            {
                url: "/date",
                question: "What is your date of birth?",
                field: "date-of-birth"
            },
            {
                url: "/file-upload",
                question: "What is your photo id?",
                field: "photo-id"
            },
            {
                url: "/radios",
                question: "Do you like cats or dogs?",
                field: "pet-preference",
                items: [
                    {value: "dogs", text: "Dogs"},
                    {value: "cats", text: "Cats"}
                ]
            },
            {
                url: "/confirmation-page",
                title: "Account created"
            }
        ]
    },

    {
        name: "Sign up your pet", steps: [

            {
                url: "/text-input",
                question: "What is your pet called?",
                field: "name"
            },

            {
                url: "/radios",
                question: "Is your pet vaccinated?",
                field: "vaccinated",
                items: [
                    {value: "yes", text: "Yes"},
                    {value: "no", text: "No"}
                ]
            },

            {
                url: "/date",
                question: "When does your pet need to be vaccinated next?",
                field: "next-vaccination"
            },

            {
                url: "/text-input",
                question: "How old is your pet?",
                field: "pet-age"
            },

            {
                url: "/radios",
                question: "How big is your pet?",
                field: "pet-size",
                items: [
                      {value: "small", text: "Small"},
                      {value: "medium", text: "Medium"},
                    {value: "large", text: "Large"}

                  ]
            },

            {
                url: "/radios",
                question: "Is your pet suitable for a home with children?",
                field: "pet-child-safe",
                items: [
                    {value: "yes", text: "Yes"},
                    {value: "no", text: "No"}
                ]
            },

            {
                url: "/check-your-answers",
                heading: "Your pets details",
                answers: [
                    { field: "name", label: "Their name" },
                    { field: "pet-age", label: "Their age" },
                    { field: "pet-size", label: "Their size" },
                    { field: "vaccinated", label: "Vaccinated?" },
                    { field: "next-vaccination", label: "Date of next vaccination" },
                    { field: "pet-child-safe", label: "Housable with children?" }
                ]
            },

            {
                url: "/confirmation-page",
                title: "Pet registered"
            }

        ]
    },


    {
           name: "Request a pet", steps: [

                {
                    url: "/radios",
                    question: "What pet are you looking for?",
                    field: "pet-preference",
                    items: [
                        {value: "dogs", text: "Dog"},
                        {value: "cats", text: "Cat"}
                    ]
                },

                {
                    url: "/radios",
                    question: "Will the pet be around children?",
                    field: "home-with-children",
                    items: [
                        {value: "yes", text: "Yes"},
                        {value: "no", text: "No"}
                    ]
                },

                {
                    url: "/date",
                    question: "When do you want the pet from?",
                    field: "pet-from"
                },

                {
                    url: "/date",
                    question: "When do you want the pet until?",
                    field: "pet-until"
                },

               {
                   url: "/check-your-answers",
                   heading: "Your request details",
                   answers: [
                       { field: "pet-preference", label: "What kind of pet" },
                       { field: "home-with-children", label: "Home with children" },
                       { field: "pet-from", label: "From" },
                       { field: "pet-until", label: "Until" }
                   ]
               },

                {
                    url: "/card-payment",
                    heading: "Pay your deposit",
                    field: "pet-deposit"
                },

               {
                   url: "/confirmation-page",
                   title: "Pet requested"
               }

           ]
       }

];