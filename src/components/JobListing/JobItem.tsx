export type JobObject = {
  title: string
  company : string
  salary: string
  city: string
  time_added: string
  link?: string
}

const JobItem = ({title, company, salary, city, time_added, link}: JobObject) => {
  return (
    <a className="job-item__container" href={link}>
      
      <div className="job-item__top-container">
        {/* <img src="" alt="" className="job-item__company-img" /> */}

        <div className="job-item__company-container">
          <p>{title}</p>
          <p className="job-item__company">{company}</p>
        </div>

      </div>

      <div className="job-item__inner-container">
        <p>{city}</p>
        <p>{salary}</p>
      </div>

      <p className="job-item__time-added">{time_added}</p>
    </a>
  )
}

export default JobItem