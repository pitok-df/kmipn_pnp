export default function AlertError({ msg }: { msg: string }) {
    return (
        <div className="p-3 w-full rounded-sm mb-3 text-success bg-success">
            {msg}
        </div>
    );
}