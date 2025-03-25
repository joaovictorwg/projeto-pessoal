import React, { useMemo } from "react";
import { useNotes } from "./Home.hook";

function Home() {
    const {
        notes,
        content,
        title,
        setContent,
        setTitle,
        createNote,
        deleteNote
    } = useNotes();

    const memoizedNotes = useMemo(() => {
        return notes.map((note) => (
            // <Note note={note} onDelete={deleteNote} key={note.id} />
            <div>note</div>
        ));
    }, [notes, deleteNote]);

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {memoizedNotes}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;