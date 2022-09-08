using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dto
{
    public class VisitDto
    {
        public Guid Id { get; set; }
        public string PatientFirstName{ get; set; }
        public string PatientLastName { get; set; }
        public string PatientEmail { get; set; }
        public string DoctorFirstName { get; set; }
        public string DoctorLastName { get; set; }
        public string DoctorEmail{ get; set; }
        public string Date { get; set; }
        public DateTime EditDate { get; set; }
        public string Room { get; set; }
        public string Type { get; set; }
        public int Duration { get; set; }
    }
}
