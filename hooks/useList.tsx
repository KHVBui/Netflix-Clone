import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Movie } from "../types";

function useList(uid: string | undefined) {
	const [list, setList] = useState<Movie[] | DocumentData[]>();

	useEffect(() => {
		if (!uid) return undefined;

		return onSnapshot(collection(db, "customers", uid, "myList"), snapshot => {
			setList(
				snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				})),
			);
		});
	}, [uid]);

	return list;
}

export default useList;
