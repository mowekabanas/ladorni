##Wine

```html
<article class="Wine is-active">

	<header class="WineHeader">

		<div class="WineHeader-background"></div>

		<div class="WineHeader-inner">

			...

		</div>

	</header>

	<section class="WineContent">

		<div class="WineContent-background"></div>

		<div class="WineContent-inner">

			<figure class="WineFigure">

				...

			</figure>

			<footer class="WineFooter">
			
				...
			
			</footer>

		</div>

	</section>

</article>
```

###Wine Header

```html
<header class="WineHeader">

	<div class="WineHeader-background"></div>

	<div class="WineHeader-inner">

		<section class="WineHeader-title">

			<h1>
				<span class="brand">...</span>    
				<strong>...</strong>
			</h1>

		</section>

		<div class="WineHeader-description pt-serif-italic">

			<p>...</p>

		</div>

	</div>

</header>
```

###Wine Content

```html
<section class="WineContent">

	<div class="WineContent-background"></div>

	<div class="WineContent-inner">

		<figure class="WineFigure">

			<div class="WineFigure-wrapper">

				<img src="image.png" alt="Title"/>

			</div>

		</figure>

		<footer class="WineFooter">

			...

		</footer>

	</div>

</section>
```

###Wine Footer

```html
<footer class="WineFooter">

	<header class="flex flex-column">

		<section class="WineResume">

			...

		</section>

		<section class="WineTable">

			...

		</section>

	</header>

	<section class="WineCheckout">

		...

	</section>

</footer>
```

###Wine Resume

```html
<section class="WineResume">

	<ul class="WineResumeList">

		<li class="WineResumeItem">

			<a class="WineResumeItem-select-area">

				<header class="WineResumeItem-header">

					<span class="icon-icon"></span>

				</header>

			<span class="WineResumeItem-title">

				<span>Title</span>

			</span>

			</a>

		</li>

		...

	</ul>

</section>
```

###Wine Table

```html
<section class="WineTable border-grey-900">

	<div class="WineTable-cell">

		<span>Text</span>

	</div>

	<div class="WineTable-cell WineTable-cell--fourth">

		<span>Text</span>

	</div>

	<div class="WineTable-cell WineTable-cell--third">

		<span>Text</span>

	</div>

	<div class="WineTable-cell WineTable-cell--half">

		<span>Text</span>

	</div>

	<div class="WineTable-cell WineTable-cell--full">

		<span>Text</span>

	</div>
	
	...

</section>
```

###Wine Checkout Button

```html
<section class="WineCheckout font-grey-900">

	<a class="WineCheckout-select-area" href="#">

		<header class="WineCheckoutIcon">

			<span class="WineCheckoutIcon-square"></span>

			<span class="WineCheckoutIcon-symbol">

				<span class="icon-basket"></span>

			</span>

		</header>

		<section class="WineCheckout-title">

			<span>Title</span>

		</section>

	</a>

</section>
```