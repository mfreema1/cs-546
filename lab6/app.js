const express = require('express');
const app = express();
const port = 3000;

app.get('/about', (req, res) => {
    res.send({
        name: "Mark Freeman",
        cwid: "10416298",
        biography: "I was born in Allentown Pennsylvania, to a family that lived on a farm in New Tripoli, PA.  For those who don't know, New Tripoli is literally the middle of nowhere. Growing up on a farm was an interesting experience which got me interested in heavy machinery.\nEventually I moved back to Allentown and graduated high school.  I then went on to study Mechanical Engineering for a year before switching to Software Engineering after meeting some great people in software and falling in love with the field.",
        favoriteShows: ["Dexter", "Sherlock", "Richard and Mortimer"],
        hobbies: ["Woodworking", "Machining", "Playing guitar", "Hi-Fi audio", "Coffee & tea", "Cooking"]
    });
});

app.get('/story', (req, res) => {
    res.send({
        storyTitle: "The Time I Crashed My OS",
        story: "So picture this: I'm working very late on an assignment for a course I cannot remember, but I do know that it had something to do with python.  I was messing around with my system's file directory, trying to get something with Python to work, but it kept complaining about something to do with Python2.7.\nSo, like any rational human would do, I go to my `lib` directory and decide I'm just going to delete Python2.7 -- I don't use it anyways.  Immediately, Linux tells me \"hey buddy, you probably don't wanna do that, it's a protected system file, but you can if you want to\", and because I know exactly what I'm doing, I hit 'yes'.\nHorrible idea.  The second that I do, my computer crashes.  On reboot, it just loads into a desktop, but without a taskbar, mouse, or anything -- just the background.  At this point -- not only am I trying to turn in my assignment on time, but my computer appears to be broken and I'm worried about my data.\nEventually I am able to get a terminal open via system recovery, and manage to transfer off my entire user directory to a USB after several hours.  Needless to say I did not get the assignment in on time.\nLesson learned: When Linux tells you that you probably don't wanna do something, listen."
    });
});

app.get('/education', (req, res) => {
    res.send([
        {
            schoolName: "Kratzer Elementary School",
            degree: "None",
            favoriteClass: "Gym Class",
            favoriteMemory: "My favorite memory from Kratzer was meeting one of my lifelong best friends in first grade."
        },
        {
            schoolName: "Parkway Manor Elementary",
            degree: "Elementary School",
            favoriteClass: "Band Class",
            favoriteMemory: "We got to dress up for halloween and I got to go as the joker, who I thought made me super cool.  Now I know it made me super cool."
        },
        {
            schoolName: "Springhouse Middle School",
            degree: "Middle School",
            favoriteClass: "Band Class",
            favoriteMemory: "I got really good at playing the trumpet in middle school, and a lot of my friends also played the trumpet.  Getting to make music with them was a lot of fun."
        },
        {
            schoolName: "Parkland High School",
            degree: "High School",
            favoriteClass: "Band Class",
            favoriteMemory: "All of my friends were in band, and every Friday night, the marching band had to go out and play at the football games.  Everybody acted like it was a total drag, but secretly everyone knew it was a ton of fun.  We spent every Friday dancing around in the stands with our friends and making music."
        }
    ]);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});