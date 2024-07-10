export default function Home() {
  async function create(formData: FormData) {
    "use server";
  }
  return (
    <>
      <div>Hello</div>
      <div>
        <form action={create}>
          <input name="username" type="text" />
          <input name="username" type="text" />
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}
