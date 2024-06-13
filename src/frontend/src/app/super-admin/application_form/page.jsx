export default function Page() {
    return(<>
    <section class="contact py-5">
	<div class="container">
		<h2 class="heading text-capitalize mb-sm-5 mb-4"> Application Form </h2>
			<div class="mail_grid_w3l">
				<form action="application_form.php?id=<?php echo $_GET['id']?>" method="post">
					<div class="row">
						<div class="col-md-6 contact_left_grid" data-aos="fade-right">
                            
							<label>Student Registration No :</label>
                            <div class="contact-fields-w3ls">
                                <input type="text" class="form-control" name="student_registration_no" placeholder="Registration No" required="required" />
                            </div>
                            <label>First Name :</label>
                            <div class="contact-fields-w3ls">
                                <input type="text" class="form-control" name="student_fname" placeholder="First Name" required="required" />
                            </div>

                            <label>Last Name :</label>
							<div class="contact-fields-w3ls">
								<input type="text" name="student_lname" placeholder="Last Name"  required="" />
							</div>
                            <label>Father's Name :</label>
							<div class="contact-fields-w3ls">
								<input type="text" name="father_name" placeholder="Father's Name"  required="" />
							</div>
                            <label>Mother's Name :</label>
							<div class="contact-fields-w3ls">
								<input type="text" name="mother_name" placeholder="Mother's Name"  required="" />
							</div>
                            <label>Current Year :</label>
							<div class="contact-fields-w3ls">
								<input type="text" name="current_year" placeholder="Current Year"  required="" />
							</div>
                            <label>Session :</label>
							<div class="contact-fields-w3ls">
								<input type="text" name="session" placeholder="Session"  required="" />
							</div>
							<label>Email Id :</label>
							<div class="contact-fields-w3ls">
								<input type="text" name="" placeholder="abc@gmail.com"  required="" />
							</div>
                            <label>Department Name :</label>
							<div class="contact-fields-w3ls">
								<input type="text" name="department_name" placeholder="Department Name"  required="" />
							</div>

							<input type="submit" name="submit" value="Click to Apply"/>
							
						</div>
					</div>

				</form>
			</div>
		
	</div>
</section>
    </>)
}