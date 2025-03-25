import { useState, useEffect, useCallback } from "react";
import api from "../../api";

interface Note {
    id: number;
    title: string;
    content: string;
}

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const getNotes = useCallback(() => {
        api
            .get("/api/notes/")
            .then((res: { data: Note[] }) => res.data)
            .then((data: Note[]) => {
                setNotes(data);
                console.log("notes data >>>", data);
            })
            .catch((err: unknown) => alert(err));
    }, []);

    useEffect(() => {
        getNotes();
    }, [getNotes]);

    const deleteNote = useCallback((id: number) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res: { status: number }) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error: unknown) => alert(error));
    }, [getNotes]);

    const createNote = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res: { status: number }) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err: unknown) => alert(err));
    }, [content, title, getNotes]);

    return {
        notes,
        content,
        title,
        setContent,
        setTitle,
        getNotes,
        deleteNote,
        createNote
    };
};