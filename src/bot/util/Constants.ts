interface Days { [key: number]: string };

export interface Schedule { [key: number]: ScheduleOptions };

type ScheduleOptions = {
    triggerAfter: number;
    text: string;
}

interface Schedules { [key: number]: Schedule };

export const DAYS: Days = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
};

export const TUES_ICE: Schedule = {
    0: {
        text: 'Good morning RV Mustangs! Today\'s a White day! Math & PE I.C.E. starts at 07:25AM!',
        triggerAfter: 0
    },
    1: {
        text: 'World Language, Art and Business I.C.E. starts at 08:00AM!',
        triggerAfter: 80
    },
    2: {
        text: 'Social Studies and Exceptional Student Services starts at 8:30AM! 2nd pd. will start at 09:10AM!',
        triggerAfter: 140
    }
}

export const THURS_ICE: Schedule = {
    0: {
        text: 'Good morning RV Mustangs! Today\'s a White day! MMP and Club Meetings start at 07:25AM!',
        triggerAfter: 0
    },
    1: {
        text: 'Science, FACS and Tech/Business I.C.E. starts at 08:00AM!',
        triggerAfter: 80
    },
    2: {
        text: 'English and Music I.C.E. starts at 8:30AM! 2nd pd. will start at 09:10AM!',
        triggerAfter: 140
    }
}

export const SILVER: Schedule = {
    25: {
        text: 'https://sycer-dev.is-pretty.cool/8wjLe9T.png',
        triggerAfter: 0
    },
    0: {
        text: 'Good morning RV Mustangs! It\'s Monday, a Silver day. 1st pd. starts at 07:25AM!',
        triggerAfter: 0
    },
    1: {
        text: 'One down, six to go. 3rd pd. starts at 08:25AM!',
        triggerAfter: 95
    },
    2: {
        text: 'Alright, five more! 5th pd. starts at 09:25AM!',
        triggerAfter: 155
    },
    3: {
        text: 'Good job, 4 more classes! 7th pd. starts at 10:25AM!',
        triggerAfter: 215
    },
    4: {
        text: 'If your 2nd pd. class is downstairs, go to lunch! If not, head over to 2nd pd. It starts at 11:25PM!',
        triggerAfter: 275
    },
    5: {
        text: 'Let\'s keep in moving! If you just had 2nd pd. go to lunch. 1st lunch, go to your 2nd pd. class, it starts at 12:25PM!',
        triggerAfter:  315
    },
    6: {
        text: 'You\'re getting closer! 4th pd. starts at 01:05PM!',
        triggerAfter: 375
    },
    7: {
        text: 'One more class! 6th pd. starts at 02:05PM!',
        triggerAfter: 435
    },
    8: {
        text: 'Good job! Tomorrow\'s a White Day, I.C.E. starts at 07:25AM!',
        triggerAfter: 515
    }
}


export const BLUE: Schedule = {
    25: {
        text: 'https://sycer-dev.is-pretty.cool/7KwFfBH.png',
        triggerAfter: 0
    },
    0: {
        text: 'Good morning RV Mustangs! It\'s a Blue day, 1st pd. starts at 07:25AM!',
        triggerAfter: 0
    },
    1: {
        text: 'Good job, 3rd pd. starts at 09:10AM!',
        triggerAfter: 150
    },
    2: {
        text: 'If your 5th pd. class is downstairs, go to lunch! If not, head over to 5th pd. It starts at 11:00AM!',
        triggerAfter: 300
    },
    3: {
        text: 'Let\'s keep in moving! If you just had 5th pd. go to lunch. 1st lunch, go to your 5th pd. class, it starts at 11:35AM!',
        triggerAfter: 335
    },
    4: {
        text: 'Last class! 7th pd. starts at 1:25PM!',
        triggerAfter: 385
    }
};

const WHITE: Schedule = {
    25: {
        text: 'https://sycer-dev.is-pretty.cool/6R8vyhN.png',
        triggerAfter: 0
    },
    3: {
        text: 'That\'s all for I.C.E. 2nd pd. starts at 09:10AM!',
        triggerAfter: 150
    },
    4: {
        text: 'If your 4th pd. is down stairs, go to lunch! If not, head over to 4th, it starts at 11:00AM!',
        triggerAfter: 300
    },
    5: {
        text: 'If you just had 4th, go to lunch! If not, head over! It starts at 11:35AM!',
        triggerAfter: 335
    },
    6: {
        text: 'Last class! 6th pd. starts at 1:25PM!',
        triggerAfter: 385
    },
    7: {
        text: 'Good work! Tomorrow\'s a Blue Day, 1st pd. starts at 07:25AM!',
        triggerAfter: 505
    }
}

export const TUES_WHITE: Schedule = {
    26: {
        text: 'https://sycer-dev.is-pretty.cool/5iZAPMG.png',
        triggerAfter: 0
    },
    0: TUES_ICE[0],
    1: TUES_ICE[1],
    2: TUES_ICE[2],
    ... WHITE
};

export const THURS_WHITE: Schedule = {
    26: {
        text: 'https://sycer-dev.is-pretty.cool/9aqp3iU.png',
        triggerAfter: 0
    },
    0: THURS_ICE[0],
    1: THURS_ICE[1],
    2: THURS_ICE[2],
    ... WHITE
};


export const SCHEDULES: Schedules = {
    1: SILVER,
    2: TUES_WHITE,
    3: BLUE,
    4: THURS_WHITE,
    5: BLUE
};