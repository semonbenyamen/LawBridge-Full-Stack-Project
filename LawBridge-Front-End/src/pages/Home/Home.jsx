import React from "react";
import LawyerCard from "../../components/LawyerCard/LawyerCard";
import styles from "./Home.module.css";

const DUMMY = [
    {
        _id: "1",
        fullName: "Ahmed Hassan",
        primarySpecialization: "Criminal",
        governorate: "Cairo",
        district: "Nasr City",
        yearsOfExperience: 12,
        consultationFee: 500,
        isFeatured: true,
    },
    {
        _id: "2",
        fullName: "Sara Mostafa",
        primarySpecialization: "Family",
        governorate: "Giza",
        district: "Dokki",
        yearsOfExperience: 8,
        consultationFee: 300,
        isFeatured: true,
    },
    {
        _id: "3",
        fullName: "Omar Khalil",
        primarySpecialization: "Corporate",
        governorate: "Alexandria",
        district: "Smouha",
        yearsOfExperience: 15,
        consultationFee: 700,
        isFeatured: false,
    },
];

const SPECIALIZATIONS = [
    "Criminal",
    "Civil",
    "Corporate",
    "Family",
    "Labor"
];

const GOVERNORATES = {

    Cairo: ["Nasr City","Maadi","Heliopolis"],

    Giza: ["Dokki","Mohandeseen","Sheikh Zayed"],

    Alexandria: ["Smouha","Miami","Agami"]
};


function Home() {

    const [search, setSearch] = React.useState("");

    const [specialization, setSpecialization] = React.useState("");

    const [governorate, setGovernorate] = React.useState("");

    const [district, setDistrict] = React.useState("");


    return (
    <div className={styles.page}>

    {/* Hero */}
        <section className={styles.hero}>
            <h1>Find Your Lawyer</h1>

            <p>Connect with trusted legal experts across Egypt</p>

            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Lawyer name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                >
               <option value="">Specialization</option>

                   {SPECIALIZATIONS.map((spec) => (
                   <option key={spec} value={spec}>
                {spec}
                </option>
            ))}
            </select>

            <select
                value={governorate}
                onChange={(e) => {
                setGovernorate(e.target.value);
                setDistrict("");
            }}
            >
            <option value="">Governorate</option>

                {Object.keys(GOVERNORATES).map((gov) => (
                <option key={gov} value={gov}>
                {gov}
            </option>
            ))}
            </select>

            <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!governorate}
            >
            <option value="">District</option>

                {governorate && GOVERNORATES[governorate].map((dist) => (
                    <option key={dist} value={dist}>{dist}</option>
            ))}
            </select>

                <button>Search</button>
            </div>
        </section>

      {/* Featured Lawyers */}
        <section className={styles.section}>
            <h2>Featured Lawyers</h2>

            <div className={styles.grid}>
                {DUMMY.filter((lawyer) => lawyer.isFeatured)
                .map((lawyer) => (
                <LawyerCard
                    key={lawyer._id}
                    lawyer={lawyer}
                    showFeaturedBadge={true}
                />
            ))}
            </div>
        </section>

      {/* Latest Lawyers */}
        <section className={styles.section}>
            <h2>Latest Lawyers</h2>

            <div className={styles.grid}>
                {DUMMY.map((lawyer) => (
                <LawyerCard
                key={lawyer._id}
                lawyer={lawyer}
            />
            ))}
            </div>
        </section>

    </div>
  );
}

export default Home;