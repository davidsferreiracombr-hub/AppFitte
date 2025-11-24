export type ForumTopic = {
    id: number;
    title: string;
    author: string;
    date: string;
    replies: number;
    lastReply: {
        author: string;
        date: string;
    };
    category: string;
};

const forumTopics: ForumTopic[] = [
    {
        id: 1,
        title: "Best natural sweeteners to use?",
        author: "HealthyEater22",
        date: "2 days ago",
        replies: 15,
        lastReply: {
            author: "FitChef_Alex",
            date: "3 hours ago",
        },
        category: "Ingredients",
    },
    {
        id: 2,
        title: "My experience with Sweet Potato Brownies - SO GOOD!",
        author: "BrownieLover",
        date: "1 day ago",
        replies: 8,
        lastReply: {
            author: "JaneDoe",
            date: "1 hour ago",
        },
        category: "Recipe Reviews",
    },
    {
        id: 3,
        title: "Pre-workout snack ideas that aren't boring?",
        author: "GymGoer_91",
        date: "5 days ago",
        replies: 22,
        lastReply: {
            author: "CoachMike",
            date: "22 hours ago",
        },
        category: "Fitness & Nutrition",
    },
    {
        id: 4,
        title: "Dairy-free dessert hacks",
        author: "LactoseFreeLife",
        date: "3 days ago",
        replies: 12,
        lastReply: {
            author: "VeganVibes",
            date: "5 hours ago",
        },
        category: "Dietary Tips",
    },
];

export async function getForumTopics(): Promise<ForumTopic[]> {
    return Promise.resolve(forumTopics);
}
