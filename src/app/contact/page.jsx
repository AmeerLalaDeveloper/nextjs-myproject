// "use client";
import Image from "next/image";
import styles from "./contact.module.css";
// import dynamic from "next/dynamic";
// import HydrationTest from "@/components/hydrationTest";
/*
**** 4 solutions for hydration error , for example math.random():****
1-using use effect - not recommended
2-using boolean flag (set the state in the useeffect ) - not recommended
3-import component dynamically with ssr option false
4- u can disable hydration warning like this :
 <div suppressHydrationWarning>{a}</div> 

*/

// const HydrationTestNoSSR = dynamic(()=>import("@/components/hydrationTest"), {ssr: false})

export const metadata = {
  title: "Contact Page",
  description: "Contact description",
};

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        {/* <HydrationTestNoSSR /> */}
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional)" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
