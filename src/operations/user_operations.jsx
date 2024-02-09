import { doc, getDoc, setDoc } from "firebase/firestore";
import { fire_auth, fire_db } from "../firebase";

export const addTask = async (task) => {
    const email = fire_auth.currentUser.email;
    const docRef = await getDoc(doc(fire_db, "users", email));
    const data = docRef.data();
    if (data !== undefined) {
        const docs = doc(fire_db, "users", email);
        await setDoc(docs, {
            ...data,
            tasks: [...data["tasks"], task],
        });
    }
};

export const removeTask = async (task) => {
    const email = fire_auth.currentUser.email;
    const docRef = await getDoc(doc(fire_db, "users", email));
    const data = docRef.data();
    if (data !== undefined) {
        await setDoc(doc(fire_db, "users", email), {
            ...data,
            tasks: data["tasks"].filter((e) => e !== task),
        });
    }
};

export const editTask = async (oldTask, newTask) => {
    const email = fire_auth.currentUser.email;
    const docRef = await getDoc(doc(fire_db, "users", email));
    const data = docRef.data();
    if (data !== undefined) {
        await setDoc(doc(fire_db, "users", email), {
            ...data,
            tasks: data["tasks"].map((str) =>
                str === oldTask ? newTask : str
            ),
        });
    }
};

export const getTasks = async () => {
    const email = fire_auth.currentUser.email;
    const docRef = await getDoc(doc(fire_db, "users", email));
    const data = docRef.data();
    return data;
};

export const addUser = async (email) => {
    const docs = doc(fire_db, "users", email);
    await setDoc(docs, {
        lastAction: {
            isEnded: true,
            started: "",
            task: "",
        },
        tasks: [],
    });
    const records = doc(fire_db, "records", email);
    await setDoc(records, {
        data: [],
    });
};

export const getAbsoluteDate = (minus = 0, isStartDate) => {
    let date = new Date(Date.now() - minus * 86400000);

    if (isStartDate) {
        date.setHours(0);
        date.setMinutes(0);
    } else {
        date.setHours(23);
        date.setMinutes(59);
    }

    return isStartDate
        ? {
              startDate: date,
              startFilter: Math.floor(date / 60000),
          }
        : {
              endDate: date,
              endFilter: Math.floor(date / 60000),
          };
};

export const getDateFilter = (selection) => {
    selection.endDate.setHours(23);
    selection.endDate.setMinutes(59);
    selection.startDate.setHours(0);
    selection.startDate.setMinutes(0);

    return {
        startDate: selection.startDate,
        startFilter: Math.floor(selection.startDate / 60000),
        endDate: selection.endDate,
        endFilter: Math.floor(selection.endDate / 60000),
    };
};
