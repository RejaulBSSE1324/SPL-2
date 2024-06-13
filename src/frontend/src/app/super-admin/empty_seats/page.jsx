export default function Page() {
    return(<>
        <section class="contact py-5">
	<div class="container">
			<div class="mail_grid_w3l">
				<form action="allocated_rooms.php" method="post">
					<div class="row">
					        <div class="col-md-9"> 
							<input type="text" placeholder="Search by Roll Number" name="search_box"/>
							</div>
							<div class="col-md-3">
							<input type="submit" value="Search" name="search"></input>
							</div>
					</div>
				</form>
			</div>
	</div>
</section>
    </>)
}