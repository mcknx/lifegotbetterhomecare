import { prisma } from '../lib/prisma';

async function main() {
  const jobData = {
    title: "Personal Care Worker",
    reportsTo: "Registered Nurse Supervisor",
    employmentType: "Full-Time / Part-Time / On-Call",
    location: "Milwaukee, Wisconsin",
    company: "Life Got Better Homecare",
    summary: "The Personal Care Worker (PCW) plays a vital role in delivering compassionate, high-quality, non-medical care to clients in their homes. The PCW supports clients with activities of daily living, promoting safety, independence, and dignity. This role is essential in helping clients maintain their quality of life and remain comfortable in their homes.",
    responsibilities: [
      "Assist clients with personal hygiene tasks such as bathing, grooming, oral care, toileting, and dressing.",
      "Support clients with mobility, transfers, and ambulation as needed.",
      "Prepare and serve meals according to client preferences and dietary restrictions.",
      "Perform light housekeeping duties, including laundry, bed-making, dusting, and general tidiness.",
      "Provide medication reminders and monitor adherence to prescribed regimens.",
      "Offer companionship and emotional support, engaging clients in conversation and recreational activities.",
      "Observe and report any changes in the client's condition or behavior to the supervisor or healthcare professional.",
      "Maintain accurate records of services provided and client progress.",
      "Assist with errands, grocery shopping, and accompanying clients to appointments if required.",
      "Adhere to the care plan and company policies, ensuring clients' privacy, dignity, and safety at all times."
    ],
    qualifications: [
      "High school diploma or equivalent preferred.",
      "Completion of a Personal Care Assistant or Home Health Aide training program is an advantage.",
      "Experience in caregiving or a similar role is preferred but not required.",
      "Ability to follow care plans, document activities, and communicate effectively.",
      "Compassionate, reliable, and patient demeanor.",
      "Ability to perform physical tasks associated with care duties (e.g., lifting, bending, standing for long periods).",
      "Must pass background check and health screening."
    ]
  };

  try {
    const newJob = await prisma.jobs.create({
      data: jobData,
    });
    console.log('Successfully added job:', newJob);
  } catch (error) {
    console.error('Error adding job:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 