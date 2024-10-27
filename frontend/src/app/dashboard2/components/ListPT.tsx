import { listPT } from "@/utils/ListPT";
import { Select } from "flowbite-react";
import { ChangeEventHandler } from "react";

export default function ListPerguruangTinggi({ value, onChange, className }: { value: string, onChange: ChangeEventHandler<HTMLSelectElement>, className?: string }) {
    const data = listPT;
    // return data.map((item) => (
    //     <option value={item}>{item}</option>
    // ));
    return (
        <Select id="kategori3" value={value} onChange={onChange} required className={className}>
            <option value="">-- pilih kategori --</option>
            {data.map((item) => (
                <option value={item}>{item}</option>
            ))}
        </Select>
    )
}