interface Days {
	[key: number]: string;
}

export interface Schedule {
	[key: number]: ScheduleOptions;
}

interface TriggerOptions {
	hr: number;
	min: number;
}

interface ScheduleOptions {
	triggerAt: TriggerOptions;
	text: string;
}

interface Schedules {
	[key: number]: Schedule;
}

export const DAYS: Days = {
	1: 'Monday',
	2: 'Tuesday',
	3: 'Wednesday',
	4: 'Thursday',
	5: 'Friday',
};

export const TUES_ICE: Schedule = {
	0: {
		text: "Good morning RV Mustangs! Today's a White day! Math & PE I.C.E. starts at 07:25AM!",
		triggerAt: {
			hr: 5,
			min: 30,
		},
	},
	1: {
		text: 'World Language, Art and Business I.C.E. starts at 08:00AM!',
		triggerAt: {
			hr: 7,
			min: 50,
		},
	},
	2: {
		text: 'Social Studies and Exceptional Student Services starts at 8:30AM! 2nd pd. will start at 09:10AM!',
		triggerAt: {
			hr: 8,
			min: 20,
		},
	},
};

export const THURS_ICE: Schedule = {
	0: {
		text: "Good morning RV Mustangs! Today's a White day! MMP and Club Meetings start at 07:25AM!",
		triggerAt: {
			hr: 5,
			min: 30,
		},
	},
	1: {
		text: 'Science, FACS and Tech/Business I.C.E. starts at 08:00AM!',
		triggerAt: {
			hr: 7,
			min: 50,
		},
	},
	2: {
		text: 'English and Music I.C.E. starts at 8:30AM! 2nd pd. will start at 09:10AM!',
		triggerAt: {
			hr: 9,
			min: 0,
		},
	},
};

export const SILVER: Schedule = {
	25: {
		text: 'https://sycer-dev.is-pretty.cool/8wjLe9T.png',
		triggerAt: {
			hr: 0,
			min: 0,
		},
	},
	0: {
		text: "Good morning RV Mustangs! It's Monday, a Silver day. 1st pd. starts at 07:25AM!",
		triggerAt: {
			hr: 5,
			min: 30,
		},
	},
	1: {
		text: 'One down, six to go. 3rd pd. starts at 08:25AM!',
		triggerAt: {
			hr: 8,
			min: 15,
		},
	},
	2: {
		text: 'Alright, five more! 5th pd. starts at 09:25AM!',
		triggerAt: {
			hr: 9,
			min: 15,
		},
	},
	3: {
		text: 'Good job, 4 more classes! 7th pd. starts at 10:25AM!',
		triggerAt: {
			hr: 10,
			min: 15,
		},
	},
	4: {
		text: 'If your 2nd pd. class is downstairs, go to lunch! If not, head over to 2nd pd. It starts at 11:25PM!',
		triggerAt: {
			hr: 11,
			min: 15,
		},
	},
	5: {
		text:
			"Let's keep in moving! If you just had 2nd pd. go to lunch. 1st lunch, go to your 2nd pd. class, it starts at 12:25PM!",
		triggerAt: {
			hr: 12,
			min: 15,
		},
	},
	6: {
		text: "You're getting closer! 4th pd. starts at 01:05PM!",
		triggerAt: {
			hr: 12,
			min: 55,
		},
	},
	7: {
		text: 'One more class! 6th pd. starts at 02:05PM!',
		triggerAt: {
			hr: 13,
			min: 55,
		},
	},
	8: {
		text: "Good job! Tomorrow's a White Day, I.C.E. starts at 07:25AM!",
		triggerAt: {
			hr: 15,
			min: 0,
		},
	},
};

export const BLUE: Schedule = {
	25: {
		text: 'https://sycer-dev.is-pretty.cool/7KwFfBH.png',
		triggerAt: {
			hr: 0,
			min: 0,
		},
	},
	0: {
		text: "Good morning RV Mustangs! It's a Blue day, 1st pd. starts at 07:25AM!", // must send at 5:30
		triggerAt: {
			hr: 5,
			min: 30,
		},
	},
	1: {
		text: 'Good job, 3rd pd. starts at 09:10AM!', // must send at 9:00
		triggerAt: {
			hr: 9,
			min: 0,
		},
	},
	2: {
		text: 'If your 5th pd. class is downstairs, go to lunch! If not, head over to 5th pd. It starts at 11:00AM!', // must send at 10:50
		triggerAt: {
			hr: 10,
			min: 50,
		},
	},
	3: {
		text:
			"Let's keep in moving! If you just had 5th pd. go to lunch. 1st lunch, go to your 5th pd. class, it starts at 11:35AM!", // must send at 11:25
		triggerAt: {
			hr: 11,
			min: 25,
		},
	},
	4: {
		text: 'Last class! 7th pd. starts at 1:25PM!', // must send at 13:15
		triggerAt: {
			hr: 13,
			min: 15,
		},
	},
	5: {
		text: (() => {
			const date = new Date();
			if (date.getDay() === 5) return "Happy Friday! Have a save weekend and we'll see you on Monday!" as string;
			return "Way to pull through it! We'll see you for tomorrow's White day starting at 7:25AM! " as string;
		})(),
		triggerAt: {
			hr: 15,
			min: 0,
		},
	},
};

const WHITE: Schedule = {
	25: {
		text: 'https://sycer-dev.is-pretty.cool/6R8vyhN.png',
		triggerAt: {
			hr: 0,
			min: 0,
		},
	},
	3: {
		text: "That's all for I.C.E. 2nd pd. starts at 09:10AM!",
		triggerAt: {
			hr: 9,
			min: 0,
		},
	},
	4: {
		text: 'If your 4th pd. is down stairs, go to lunch! If not, head over to 4th, it starts at 11:00AM!',
		triggerAt: {
			hr: 10,
			min: 50,
		},
	},
	5: {
		text: 'If you just had 4th, go to lunch! If not, head over! It starts at 11:35AM!',
		triggerAt: {
			hr: 11,
			min: 25,
		},
	},
	6: {
		text: 'Last class! 6th pd. starts at 1:25PM!',
		triggerAt: {
			hr: 13,
			min: 15,
		},
	},
	7: {
		text: "Good work! Tomorrow's a Blue Day, 1st pd. starts at 07:25AM!",
		triggerAt: {
			hr: 15,
			min: 0,
		},
	},
};

export const TUES_WHITE: Schedule = {
	26: {
		text: 'https://sycer-dev.is-pretty.cool/5iZAPMG.png',
		triggerAt: {
			hr: 0,
			min: 0,
		},
	},
	0: TUES_ICE[0],
	1: TUES_ICE[1],
	2: TUES_ICE[2],
	...WHITE,
};

export const THURS_WHITE: Schedule = {
	26: {
		text: 'https://sycer-dev.is-pretty.cool/9aqp3iU.png',
		triggerAt: {
			hr: 0,
			min: 0,
		},
	},
	0: THURS_ICE[0],
	1: THURS_ICE[1],
	2: THURS_ICE[2],
	...WHITE,
};

export const SCHEDULES: Schedules = {
	1: SILVER,
	2: TUES_WHITE,
	3: BLUE,
	4: THURS_WHITE,
	5: BLUE,
};
