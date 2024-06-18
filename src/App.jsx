import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import NotFoundPage from './pages/NotFoundPage';

const addJob = async (newJob) => {
  try {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });

    if (!res.ok) {
      throw new Error('Error adding job');
    }
  } catch (error) {
    console.error('Error adding job', error);
  }
}

const deleteJob = async (id) => {
  try {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Error deleting job');
    }

    window.location.href = '/jobs';
  } catch (error) {
    console.error('Error deleting job', error);
  }
}

const updateJob = async (updatedJob) => {
  try {
    const res = await fetch(`/api/jobs/${updatedJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJob),
    });

    if (!res.ok) {
      throw new Error('Error updating job');
    }
  } catch (error) {
    console.error('Error updating job', error);
  }
}

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader} />
        <Route path='add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>,
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App;