import { useFormik } from 'formik';
import { Formik } from 'formik';
import { useContext } from 'react';
import * as yup from "yup";
import { MyContext } from './App';

function EditRoster({ id, roster_size, level, year, handleUpdateRoster }) {
    const {setCoaches} = useContext(MyContext)
    
    const validationSchema = yup.object({
        roster_size: yup.number()
          .required('Roster size is required'),
        level: yup.string()
          .required("Level is required"),
        year: yup.number()
          .required('Year is required'),
    })

    const formik = useFormik({
        initialValues: {
            roster_size: roster_size,
            level: level,
            year: year,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch(`/rosters/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const updatedRoster = await response.json();
                handleUpdateRoster(updatedRoster);
                fetch('/coaches')
                .then((r) => r.json())
                .then((data) => setCoaches(data))
            } catch (error) {
                throw new Error('Nope')
            }
        },
    });


    return (
        <Formik>
            <form onSubmit={formik.handleSubmit} className="edit-roster">
                <h3>Edit Roster</h3>
                {formik.errors.roster_size && <div>{formik.errors.roster_size}</div>}
                <input 
                    type="text"
                    name="roster_size"
                    onChange={formik.handleChange}
                    value={formik.values.roster_size}
                    placeholder="Roster Size"
                />
                <br/>
                {formik.errors.level && <div>{formik.errors.level}</div>}
                <input
                    type="text"
                    name="level"
                    onChange={formik.handleChange}
                    value={formik.values.level}
                    placeholder="Roster Level"
                />
                <br/>
                {formik.errors.year && <div>{formik.errors.year}</div>}
                <input
                    type="text"
                    name="year"
                    onChange={formik.handleChange}
                    value={formik.values.year}
                    placeholder="Roster Year"
                />
                <button type="submit">Save</button>
            </form>
        </Formik>
    );
}
export default EditRoster;