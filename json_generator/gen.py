from random import randint
import string
import json


#salary = {"base_salary": bs,
#          "bonus": bonus,
#          "compensation": compensation,
#          "company": company,
#          "gender": gender,
#          "years_of_experience": years_of_experience,
#          "education": education,
#          "certification": certification,
#          "major": major,
#          "disability": disability,
#          "ethnicity": ethnicity,
#          "age": age,
#          "marital_status": marital_status,
#          "veteran_status": veteran_status,
#          "job_title": job_title,
#          "num_of_reports": num_of_reports,
#          "shifts": shifts
#          "location": location
#          }

#companies = list(string.ascii_lowercase)
companies = ["Apple Inc.", "Samsung Electronics", "Foxconn",
             "Amazon.com","HP Inc.", "Microsoft","IBM", "Alphabet Inc.",
             "Sony", "Panasonic","Huawei","Dell",
             "Toshiba", "Intel", "Cisco", "eBay"]
base_salary_range = [70, 200]
bonus_range = [10, 50]
compensation_range = [10, 50]
genders = ['F', 'M', 'unspecified']
educations = ['GED','AAS', 'BS','MS','PHD']
certifications_range = [0, 50]
races = ["White", "Black", "AmericanIndian/AlaskanNative", "Asian"]
ethnicities = ["Non-Hispanic", "Hispanic"]
disability_status = ["disabled", "not-disabled", "unspecified"]
age_range = [16, 80]
marital_status_values = ["unspecified", "single", "widowed", "separated", "divorced"]
veteran_status_values = ["unspecified", "veteran", "non-veteran"]
majors = ["Aeronautical Engineering", "Civil Engineering","Mechanical Engineering",
          "Aerospace Engineering", "Computer Engineering", "Meteorology/Atmospheric Sciences",
          "Architectural Engineering", "Computer Science", "Nuclear Engineering",
          "Architecture	Electrical Engineering", "Nuclear Physics","Astronautical Engineering",
          "Environmental Engineering", "Operations Research", "Chemistry", "Mathematics", "Physics", "others"]

job_titles = ["Application Developer","Application Support Analyst","Applications Engineer","Associate Developer",
              "Chief Technology Officer","Chief Information Officer","Computer and Information Systems Manager",
              "Computer Systems Manager","Customer Support Administrator","Customer Support Specialist",
              "Data Center Support Specialist","Data Quality Manager","Database Administrator","Desktop Support Manager",
              "Desktop Support Specialist","Developer","Director of Technology","Front End Developer","Help Desk Specialist",
              "Help Desk Technician","Information Technology Coordinator","Information Technology Director",
              "Information Technology Manager","IT Support Manager","IT Support Specialist","IT Systems Administrator",
              "Java Developer","Junior Software Engineer","Management Information Systems Director",".NET Developer",
              "Network Architect","Network Engineer","Network Systems Administrator","Programmer","Programmer Analyst",
              "Security Specialist","Senior Applications Engineer","Senior Database Administrator","Senior Network Architect",
              "Senior Network Engineer","Senior Network System Administrator","Senior Programmer","Senior Programmer Analyst",
              "Senior Security Specialist","Senior Software Engineer","Senior Support Specialist","Senior System Administrator",
              "Senior System Analyst","Senior System Architect","Senior System Designer","Senior Systems Analyst",
              "Senior Systems Software Engineer","Senior Web Administrator","Senior Web Developer","Software Architech",
              "Software Engineer","Software Quality Assurance Analyst","Support Specialist","Systems Administrator",
              "Systems Analyst","System Architect","Systems Designer","Systems Software Engineer","Technical Operations Officer",
              "Technical Support Engineer","Technical Support Specialist","Technical Specialist","Telecommunications Specialist",
              "Web Administrator","Web Developer","Webmaster", "others"]
size_of_comapny_values = ["1-10", "10-100", "100-1000", "1000-5000", "5000-10000", "10000+"]
locations = ["Southwest", "Texas East", "Northwest/Northern Border", "West Coast", "Midwest", "Northeast",
                 "Central/East Coast", "Southeast", "Florida", "Pacific ", "Alaska", " Hawaii"]


content = list()
for i in xrange(1000):
    bs = randint(base_salary_range[0]* 1000, base_salary_range[1]* 1000)
    bonus = randint(bonus_range[0] * 1000, bonus_range[1]* 1000)
    company = companies[randint(0, len(companies)-1)]
    compensation = randint(compensation_range[0]* 1000, compensation_range[1]* 1000)
    gender = genders[randint(0, len(genders)-1)]
    years_of_experience = randint(0,40)
    education = educations[randint(0, len(educations)-1)]
    certification = randint(certifications_range[0], certifications_range[1])
    race = races[randint(0, len(races)-1)]
    ethnicity = ethnicities[randint(0, len(ethnicities)-1)]
    disability = disability_status[randint(0, len(disability_status)-1)]
    age = randint(age_range[0],age_range[1])
    marital_status = marital_status_values[randint(0, len(marital_status_values)-1)]
    veteran_status = veteran_status_values[randint(0, len(veteran_status_values)-1)]
    num_of_reports = randint(0,20)
    job_title = job_titles[randint(0, len(job_titles)-1)]
    shifts = randint(1,3)
    major = majors[randint(0, len(majors)-1)]
    size_of_comapny = size_of_comapny_values[randint(0, len(size_of_comapny_values)-1)]
    location = locations[randint(0, len(locations)-1)]

    content.append({
        "base_salary": bs,
        "bonus": bonus,
        "compensation": compensation,
        "company": company,
        "gender": gender,
        "years_of_experience": years_of_experience,
        "education": education,
        "certification": certification,
        "major": major,
        "disability": disability,
        "ethnicity": ethnicity,
        "race": race,
        "age": age,
        "marital_status": marital_status,
        "veteran_status": veteran_status,
        "job_title": job_title,
        "num_of_reports": num_of_reports,
        "shifts": shifts

    })
    
with open('data.json', 'w') as outfile:
    json.dump(content, outfile, indent=4)
    
