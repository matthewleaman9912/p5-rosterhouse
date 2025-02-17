import { useFormik } from 'formik';
import { Formik } from 'formik';

function EditRoster({ id, roster_size, level, year, handleUpdateRoster }) {
    const formik = useFormik({
        initialValues: {
            roster_size: roster_size,
            level: level,
            year: year,
        },
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
            } catch (error) {
                throw new Error('Nope')
            }
        },
    });


    return (
        <Formik>
            <form onSubmit={formik.handleSubmit} className="edit-roster">
                <h3>Edit Roster</h3>
                <input 
                    type="text"
                    name="roster_size"
                    onChange={formik.handleChange}
                    value={formik.values.roster_size}
                    placeholder="Roster Size"
                />
                <input
                    type="text"
                    name="level"
                    onChange={formik.handleChange}
                    value={formik.values.level}
                    placeholder="Roster Level"
                />
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