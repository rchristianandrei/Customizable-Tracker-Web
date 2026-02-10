import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ManageTracker } from "@/pages/manage-tracker/ManageTracker";
import { TrackerProvider } from "@/contexts/TrackerContext";
import { EditTracker } from "@/pages/manage-tracker/edit-tracker/EditTracker";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="" element={<ManageTracker />}></Route>
          <Route
            path="/:id"
            element={
              <TrackerProvider>
                <EditTracker />
              </TrackerProvider>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
