export default function AlertError({ errors }: { errors: string }) {
    return (
        <div className="p-3 w-full rounded-sm mb-3 text-error bg-lighterror">
            {errors}
        </div>
    );
}