import { doc, getDoc, setDoc } from "firebase/firestore";
import { fire_auth, fire_db } from "../firebase";

const closeTask = async (email, task, time) => {
    const docs = doc(fire_db, "records", email);
    const docRef = await getDoc(docs);
    const data = docRef.data().data;
    const date = new Date();
    const formattedDate = date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
    });

    const newData = data[data.length - 1];

    if (newData && newData.name === formattedDate) {
        newData[task] = newData[task] ? newData[task] + time : time;
    } else {
        data.push({
            name: formattedDate,
            date: Math.floor(date / 60000),
            [task]: time,
        });
    }

    await setDoc(docs, { data: data });
};

export const startTask = async (task) => {
    const email = fire_auth.currentUser.email;
    const docRef = await getDoc(doc(fire_db, "users", email));
    const data = docRef.data();

    if (data !== undefined) {
        const docs = doc(fire_db, "users", email);
        if (data.lastAction.task === "") {
            await setDoc(docs, {
                ...data,
                lastAction: {
                    started: Math.floor(Date.now() / 60000),
                    task: task,
                },
            });
        } else {
            let totalSecs =
                Math.floor(Date.now() / 60000) - data.lastAction.started;

            await closeTask(email, task, totalSecs);

            if (data.lastAction.task === task) {
                await setDoc(docs, {
                    ...data,
                    lastAction: {
                        started: 0,
                        task: "",
                    },
                });
            } else {
                await setDoc(docs, {
                    ...data,
                    lastAction: {
                        started: Math.floor(Date.now() / 60000),
                        task: task,
                    },
                });
            }
        }
    }
};

export const getRecords = async () => {
    const email = fire_auth.currentUser.email;
    const docs = doc(fire_db, "records", email);
    const docRef = await getDoc(docs);
    return docRef.data().data;
};
