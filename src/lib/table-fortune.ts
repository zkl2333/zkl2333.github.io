export type TableAction = "tea" | "lamp" | "code";

interface Fortune {
	id: number;
	text: string;
	tag: string;
}

const fortunes: Fortune[] = [
	{ id: 1, text: "热茶续上，bug 退场。今天也宜写点让自己开心的小东西。", tag: "茶歇签" },
	{ id: 2, text: "先把眼前的这顿饭吃好，再慢慢解决那些没写完的代码。", tag: "认真吃饭" },
	{ id: 3, text: "今日菜单：一点好奇心，两行代码，三分热气腾腾的生活。", tag: "小饭桌特供" },
	{ id: 4, text: "人生建议：少看点报错，多喝口热茶。然后，再把它修好。", tag: "前端偏方" },
	{ id: 5, text: "不赶时间的下午，适合给普通的想法加一点有趣的交互。", tag: "灵感签" },
	{ id: 6, text: "一个也没关系的。一个人，也要把日子过得有滋有味。", tag: "一人食" },
	{ id: 7, text: "喜欢的事慢慢做，喜欢的饭趁热吃。剩下的交给时间。", tag: "生活签" },
];

let lastId = -1;

/** A local, deterministic copy generator. No prompt, key, or network request. */
export function getTableFortune(action: TableAction, sequence: number, lampOn = true): Fortune {
	if (action === "lamp") {
		return lampOn
			? { id: 0, text: "给理想留一盏灯，也给自己留一点热气。", tag: "暖灯已点亮" }
			: { id: 0, text: "把灯调暗一点，让忙碌了一天的心也慢下来。", tag: "暖灯已调暗" };
	}
	if (action === "code") {
		return { id: 0, text: "console.log('今天也要好好吃饭。');", tag: "小饭桌.ts" };
	}
	const hour = new Date().getHours();
	let index = (hour + sequence * 3) % fortunes.length;
	if (fortunes[index].id === lastId) index = (index + 1) % fortunes.length;
	lastId = fortunes[index].id;
	return fortunes[index];
}
