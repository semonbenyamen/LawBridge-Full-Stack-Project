import React from "react";
import LawyerCard from "../../components/LawyerCard/LawyerCard";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import { lawyers } from "../../data/lawyers";
import styles from "./Home.module.css";

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

// Search States
    const [search, setSearch] = React.useState("");
    const [specialization, setSpecialization] = React.useState("");
    const [governorate, setGovernorate] = React.useState("");
    const [district, setDistrict] = React.useState("");
// Loading State
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

// Filter Lawyers
    const filteredLawyers = lawyers.filter((lawyer) => {

        const matchName =
            lawyer.fullName
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchSpecialization =
            specialization === "" ||
            lawyer.primarySpecialization === specialization;

        const matchGovernorate =
            governorate === "" ||
            lawyer.governorate === governorate;

        const matchDistrict =
            district === "" ||
            lawyer.district === district;



            return (
                matchName && 
                matchSpecialization &&
                matchGovernorate &&
                matchDistrict
            );
        });

        return (

    <div className={styles.page}>

    {/* Hero */}
        <section className={styles.hero}>
            <h1>Find Your Lawyer</h1>

            <p>Connect with trusted legal experts across Egypt</p>

            <div className={styles.filters}>
        {/* Search By Name */}
                <input
                    type="text"
                    placeholder="Lawyer name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
        {/* Specialization Filter */}
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
        {/* Governorate Filter */}
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
        {/* District Filter */}
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
                <button
                    onClick={() => {
                        setSearch("");
                        setSpecialization("");
                        setGovernorate("");
                        setDistrict("");
                    }}
                    > Reset</button>
            </div>
        </section>

      {/* Featured Lawyers */}
        <section className={styles.section}>
            <h2>Featured Lawyers</h2>

            <div className={styles.grid}>
                {loading ?  (
                     <>
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                     </>
                ) : (
                    lawyers
                        .filter((lawyer) => lawyer.isFeatured)
                        .map((lawyer) => (
                            <LawyerCard
                            key={lawyer._id}
                            lawyer={lawyer}
                    />
                  ))
                )}
            </div>
        </section>

      {/* Latest Lawyers */}
        <section className={styles.section}>
            <h2>Latest Lawyers</h2>

            <div className={styles.grid}>
                {loading ? (
                   <>
                   <SkeletonCard />
                   <SkeletonCard />
                   <SkeletonCard />
                   <SkeletonCard />
                   </>
                ) : filteredLawyers.length > 0 ? (
                    filteredLawyers.map((lawyer) => (
                        <LawyerCard
                            key={lawyer._id}
                            lawyer={lawyer}
                    />
                ))
            ) : (
                <div className={styles.emptyState}>
                 <h3>No Lawyers Found</h3>
                 <p>Try changing your search criteria.</p>
                 </div>
            )}
            </div>
        </section>

    </div>
  );
}

export default Home;