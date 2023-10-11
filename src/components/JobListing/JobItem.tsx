export type JobObject = {
  title: string
  company : string
  company_img: string
  salary: string
  city: string
  time_added: string
  link?: string
}

const JobItem = ({title, company, company_img, salary, city, time_added, link}: JobObject) => {
  return (
    <a className="job-item__container" href={link}>
      
      <p className="job-item__title">{title}</p>

      <div className="job-item__company-container">
        <img src={company_img} alt="" className="job-item__company-img" />
        <p className="job-item__company">{company}</p>
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