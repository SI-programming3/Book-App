import React from "react";
import AddReview from "./containers/AddReview";
import ReviewList from "./components/ReviewList";
import Footer from "./components/Footer";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      本のレビュー
      <AddReview />
      <Footer />
      <ReviewList />
    </div>
  );
}

export default App;
