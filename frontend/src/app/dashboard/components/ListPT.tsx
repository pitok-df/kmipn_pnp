import { listPT } from "@/utils/ListPT";
import { Select } from "flowbite-react";
import { uniqueId } from "lodash";
import { ChangeEventHandler } from "react";

export default function ListPerguruangTinggi({ value, onChange, className }: { value: string, onChange: ChangeEventHandler<HTMLSelectElement>, className?: string }) {
    const data = listPT;
    return (
        <Select id="instansi" value={value} onChange={onChange} required className={className}>
            <option key={String(uniqueId())} value="">-- pilih instansi --</option>
            {data.map((item) => (
                <option key={"instansi" + uniqueId()} value={item}>{item}</option>
            ))}
        </Select>
    )
}