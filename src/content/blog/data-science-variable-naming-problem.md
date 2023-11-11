---
title: 'Data Science Has a Variable Naming Problem'
description: 'Machine learning code almost always suffers from confusing variable names. Clearer, more descriptive variable names can simplify code and make it more accessible to all skill levels.'
pubDate: 'Nov 10 2023'
heroImage: '/sad-data-scientist.webp'
---

# Data Science Has a Variable Naming Problem

Software engineers universally frown upon single-letter variable names. Data scientists haven't gotten the memo yet.

I've noticed a problem with nearly every paper, article, tutorial, and blog post about machine learning: bad variable names. The problem is so widespread that I initially took it for granted. But the confusing variable names were reducing my learning rate (heh) so much that I think it's worth talking about. As someone from a software engineering background, I declare unto the data science community that there is a better way.

To illustrate the problem, here's an example I encountered recently while working on a project. I was studying Peter Bloem's fantastic tutorial [Transformers from scratch](https://peterbloem.nl/blog/transformers). In his guide, Bloem provides excellent PyTorch code snippets for implementing a transformer model. Central to transformers is a concept called "attention." Bloem's code for computing attention is shown below.

I've commented my thoughts from when I first read this. You don't need to understand the code to understand my point.

```python
def forward(self, x):
# Seriously? The parameter is just named x?
# That usually means "input" in the machine learning world, right?
# Darn mathematicians, brevity is not elegance!
# Why not just call it "input"?

    b, t, k = x.size()
    # Okay, so b, t, and k are the dimensions of "input"
    # No idea what those dimensions represent.
    # *b* is probably the batch size, I guess?
    # No clue about the others. Let's just roll with it.

    h = self.heads
    # *h* means the number of heads in the attention mechanism.
    # Pretty straightforward, I suppose.
    # But it adds one more thing to my cognitive load.
    # Now I'm going to have to mentally find-and-replace
    # every instance of h for the rest of the function.

    queries = self.toqueries(x)
    keys    = self.tokeys(x)   
    values  = self.tovalues(x)
    # Ah, passing the raw values through a neural net.
    # This part is pretty clear, actually!

    s = k // h
    # Oh boy, some mental find-and-replace already!
    # Since I don't know what k means (heh)
    # I shouldn't even bother to try to figure out the meaning of s.

    keys    = keys.view(b, t, h, s)
    queries = queries.view(b, t, h, s)
    values  = values.view(b, t, h, s)
    # Reshaping the vectors for multi-headed attention. Cool.

    keys    = keys.transpose(1, 2).contiguous().view(b * h, t, s)
    queries = queries.transpose(1, 2).contiguous().view(b * h, t, s)
    values  = values.transpose(1, 2).contiguous().view(b * h, t, s)
    # Oh boy, more mental find-and-replace.
    # Looks like we're reshaping the tensors, but I have no idea why.
    # I wish I knew what t and s mean.

    dot = torch.bmm(queries, keys.transpose(1, 2))
    # Ah, batch matrix multiplication. A.K.A. the dot product.
    # So we're taking the dot product of the queries with the keys.
    # I remember that's part of the attention algorithm,
    # but I can't remember why. Maybe the variable name will expla—
    # Wait, they just named the result "dot"?
    # Gee, that really clears things up, thanks.

    dot = dot / (k ** (1/2))
    # Scaling the mysterious dot thing.
    # Could have at least named it dot_scaled or something.
    
    dot = F.softmax(dot, dim=2)
    # Softmax converts numbers into probabilities, basically.
    # Seems like a pretty significant modification.
    # But we're still sticking with the "dot" name. Ugh.

    out = torch.bmm(dot, values).view(b, h, t, s)
    # Looks like we're computing the final attention vector here.
    # Oh, that "dot" thing from earlier was how much each
    # word in the sequence got payed attention to!
    # Why didn't we just call it attention_weights or something?

    out = out.transpose(1, 2).contiguous().view(b, t, s * h)
    # I still have no idea what t and s mean.
    
    return self.unifyheads(out)
    # I feel like I understood about 25% of what I just read.
```

To the inexperienced, this code is completely incomprehensible. An experienced data scientist could probably understand most of it on a first pass, but that's only possible because data scientists have spent years adapting to industry convention and tradition. Relative novices like me get steamrolled by it.

I don't blame Bloem for writing his code this way; everyone does it. I believe this coding style stems from the fact that machine learning research papers describe their algorithms using mathematical notation. For some reason, mathematicians love writing equations as concisely as possible, even when it means sacrificing clarity. Some people go so far as to declare [math notation is broken](https://davidwees.com/content/mathematical-notation-broken/).

I personally wouldn't call math notation *broken*, but I don't think it's descriptive enough to be a good coding style. In academia, sure, but not the real world. Too much cognitive load.

Here's how I would improve the code snippet above. (feel free to skip this if you're not experienced with PyTorch or transformer models)

```python
def forward(self, input_tensor):

    # batch_size: number of samples processed at a time
    # sequence_length: the length of the sequence (e.g., number of words/tokens)
    # feature_size: the size of each feature vector
    batch_size, sequence_length, feature_size = input_tensor.size()

    # run queries, keys, values through neural networks before computing attention.
    queries = self.toqueries(input_tensor)
    keys    = self.tokeys(input_tensor)   
    values  = self.tovalues(input_tensor)

    # each head in the multi-headed attention mechanism gets a subset of the features
    head_feature_size = feature_size // self.heads

    # Reshape the vectors for multi-headed attention
    keys    = keys.view(batch_size, sequence_length, self.heads, head_feature_size)
    queries = queries.view(batch_size, sequence_length, self.heads, head_feature_size)
    values  = values.view(batch_size, sequence_length, self.heads, head_feature_size)

    # Transposing and reshaping the tensors for attention calculation
    keys    = keys.transpose(1, 2).contiguous().view(batch_size * self.heads, sequence_length, head_feature_size)
    queries = queries.transpose(1, 2).contiguous().view(batch_size * self.heads, sequence_length, head_feature_size)
    values  = values.transpose(1, 2).contiguous().view(batch_size * self.heads, sequence_length, head_feature_size)

    # attention_scores is the dot product of queries and keys, which indicates how much attention to pay to other parts of the sequence.
    attention_scores = torch.bmm(queries, keys.transpose(1, 2)) / (feature_size ** 0.5)

    # convert the raw scores into probabilities
    attention_probs = F.softmax(attention_scores, dim=2)

    # the final attention vector for each head.
    attention_output = torch.bmm(attention_probs, values).view(batch_size, self.heads, sequence_length, head_feature_size)

    # Reshape the attention output to the original tensor size.
    attention_output = attention_output.transpose(1, 2).contiguous().view(batch_size, sequence_length, feature_size * self.heads)

    # combined attention output from all heads.
    return self.unifyheads(attention_output)
```

Does it make the code a bit longer? Sure, but it's much easier on the brain. Could this be taken too far? Absolutely. At some point *really long* variable names do more harm than good. But anything is better than single-letter variable names. Just one or two extra letters can make a big difference.

Why don't data scientists do this already? I suspect the reason is because they view themselves as next-door neighbors to mathematicians.

![A spectrum with software engineering on the left and mathematics on the right. Data science is much closer to mathematics](/data-sci-spectrum-false.webp)

But I think data science is closer to the middle mathematics/programming spectrum.

![A spectrum with software engineering on the left and mathematics on the right. Data science is in the center](/data-sci-spectrum-true.webp)

Therefore, I submit that machine learning code should not look like it came out of a math textbook.

TL;DR: **Everyone benefits from better variable names.** Students learn faster, new hires onboard quicker, and everyone's cognitive load lessens. Next time you're implementing an ML algorithm, go easy on the interns and make your code readable.
