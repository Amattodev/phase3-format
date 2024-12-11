import Link from "next/link";
import Styles from "./styles/Home.module.css";

export default function Home() {
  return (
    <>
      Visit{" "}
      <Link href="/SpreadsheetPage" className={Styles.link}>
        My Spreadsheet app!
      </Link>
    </>
  );
}
