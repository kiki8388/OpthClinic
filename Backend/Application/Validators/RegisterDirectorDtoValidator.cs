﻿using Application.Commands;
using FluentValidation;
using Infrastructure.DbContext;
using System.Linq;

namespace Application.Validators
{
    public class RegisterDirectorDtoValidator : AbstractValidator<RegisterDirector>
    {
        public RegisterDirectorDtoValidator(ApplicationDbContext dbContext)
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Password).MinimumLength(8);

            RuleFor(x => x.ConfirmPassword).Equal(e => e.Password);

            RuleFor(x => x.Email)
                .Custom((value, context) =>
                {
                    var emailInUse = dbContext.Directors.Any(u => u.Email == value);
                    if (emailInUse)
                    {
                        context.AddFailure("Email", "This email is already taken");
                    }
                });

            RuleFor(x => x.Phone).MaximumLength(9);
        }
    }
}
