import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Contact from '../pages/Contact'
import Issues from '../pages/Issues'
import IssueDetail from '../pages/IssueDetail'
import Settings from '../pages/Settings'

import Layout from '../components/layout/Layout'


function AppRoutes() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout/>}>

                    <Route index element={<Dashboard />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/issues" element={<Issues />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/issues/:id" element={<IssueDetail />} />
                </Route>


            </Routes>
        </Router>

    )
}

export default AppRoutes;