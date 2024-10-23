import axios from "axios";

export default async function CategoryLomba() {
    const response = await axios.get('http://localhost:2003/api/v1/categories');
    console.log(response)
    return (
        <div>

        </div>
    );
}