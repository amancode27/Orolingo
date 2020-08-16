import React, { useState, useEffect } from 'react'
import basename from './../Home/basename'
import axios from 'axios'
import PropTypes from 'prop-types'

const StudentCourse = props => {

  const [courseName, setCourseName] = useState("");
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios.get(`${basename}/api/course/${props.match.params.courseid}/`)
      .then(res => {
        setCourseName(res.data.name)
      })
      .then(
        axios.get(`${basename}/api/assignment/`)
        .then(res => {
          setAssignments(res.data.objects.filter((element) => {
            return element.course === `/api/course/${props.match.params.courseid}/`
          }))
        })
      )
  }, [])

  return (
    <div>
      Assignments
      <li>
        {assignments.map(element => element.name)}
      </li>
    </div>
  )
}

StudentCourse.propTypes = {

}

export default StudentCourse
