#Mowe La Dorni Project 

##Wine

The Wine instance has support for three types of states:

* is-active
* is-expanded
* is-animated (only DOM use)

```html
<article class="Wine deep-purple-100 is-active is-expanded">

	<div class="Wine-background"></div> <!-- optional -->
    
    <div class="Wine-inner">

        <header class="WineHeader"...>

        <figure class="WineFigure"...>

        <footer class="WineFooter"...>

        <section class="WineShowMore"...>
        
    </div>

</article>
```

###Header

```html
<header class="WineHeader">

	<div class="WineHeader-background grey-100"></div>
    
    <div class="WineHeader-inner">

        <section class="WineHeader-title">

            <h2>

                <span class="brand"...>
                <strong...>

            </h2>

        </section>

        <section class="WineHeader-short-description crimson-text-italic">

            <p...>

        </section>

        <section class="WineResume"></section>

    </div>

</header>
```

###Figure

```html
<figure class="WineFigure">

	<div class="WineFigure-wrapper">

		<img class="WineFigure-img" src="..." alt="..."/>

	</div>

</figure>
```

###Footer

```html
<footer class="WineFooter font-grey-900">

	<section class="WineAbout">

		<section class="WineResume"...>

		<section class="WineDescription"...>

		<section class="WineTable"...>
		
	</section>

	<section class="WineCheckout"...>

</footer>
```

###Resume

```html
<section class="WineResume">

	<ul class="WineResumeList">

		<li class="WineResumeItem">

			<a class="WineResumeItem-select-area">

				<header class="WineResumeItem-header">

					<span class="icon-..."></span>

				</header>

				<span class="WineResumeItem-title">

					<span>...</span>

				</span>

			</a>

		</li>

		<li class="WineResumeItem"...>
		
		<li class="WineResumeItem"...>
		
		...

	</ul>

</section>
```

###Description

```html
<section class="WineDescription">

	<div class="WineDescription-wrapper">

		<div class="WineDescriptionText">

			<p>...</p>

		</div>

	</div>

</section>
```


###Table

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

###Checkout button

```html
<section class="WineCheckout">

	<a class="WineCheckout-select-area" href="..."></a>

</section>
```

Warning: This element are automatically normalized at every instance from wine

DOM code:

```html
<section class="WineCheckout">

	<a class="WineCheckout-select-area" href="...">

		<span class="WineCheckoutTitle">

			<span class="Wine-anchor-text">...</span>

		</span>

		<span class="WineCheckoutButton"></span>

		<span class="WineCheckoutIcon">

			<span class="WineCheckoutIcon-icon icon-..."></span>

		</span>

	</a>

</section>
```

###Wine Show More button

Warning: This element are automatically build at every instance from Wine, so you don't need to put this part to html code 

DOM code:

```html
<section class="WineShowMore">

	<a class="WineShowMore-select-area">
	
		<span class="WineShowMoreTitle">
	
			<span class="Wine-anchor-text WineShowMoreTitle-text WineShowMoreTitle-text--opened">Fechar</span>
	
			<span class="Wine-anchor-text WineShowMoreTitle-text WineShowMoreTitle-text--closed">Mais Informações</span>
	
		</span>
	
		<span class="WineShowMoreButton"></span>
	
		<span class="WineShowMoreIcon">
	
			<span class="WineShowMoreIcon-icon WineShowMoreIcon-icon--open">
	
				<span class="icon-angle-left"></span>
	
			</span>
	
			<span class="WineShowMoreIcon-icon WineShowMoreIcon-icon--close">
	
				<span class="icon-angle-right"></span>
	
			</span>
	
		</span>
	
	</a>
	
</section>
```